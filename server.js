import { dirname } from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import zlib from 'node:zlib'
import stream from 'stream'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const mode = process.env.NODE_ENV
const distPath = path.join(__dirname, mode !== 'production' ? 'dist' : '')
const distAssetsPath = path.join(distPath, 'assets')

const startDate = new Date()
const PORT = 3000
const MIME = {
  js: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  svg: 'image/svg+xml; charset=utf-8',
  jpg: 'image/jpeg; charset=utf-8',
  json: 'application/json; charset=utf-8',
  html: 'text/html; charset=utf-8',
}
const staticFolders = [
  'Входящие',
  'Важное',
  'Отправленные',
  'Черновики',
  'Архив',
  'Спам',
  'Корзина',
]
const userFolders = new Set()
const db = []
const imagesInLetters = {}
const allMessages = {}

const reader = fs.createReadStream(path.join(__dirname, 'db.json'), {
  highWaterMark: 81920, // 10kb = 8 * 1024 * 10
  encoding: 'utf-8',
})

let chunkOfObject = ''
const brackets = { '}': 0, '{': 0 }
reader.on('data', chunk => {
  let start = null
  const length = chunk.length
  for (let i = 0; i < length; i++) {
    const chunkChar = chunk[i]
    const isStart = chunkChar === '{'
    const isEnd = chunkChar === '}'
    if (isEnd || isStart) brackets[chunkChar]++
    try {
      if (length - 1 === i) {
        if (isEnd && brackets['}'] === brackets['{']) {
          chunkOfObject += chunk.slice(start || 0, i + 1)
          const message = JSON.parse(chunkOfObject)
          db.push(message)
          continue
        }
        if (isStart && brackets['}'] === brackets['{'] - 1) {
          chunkOfObject = chunkChar
          start = null
          continue
        }
        if (brackets['}'] === brackets['{']) continue
        chunkOfObject += chunk.slice(start, i + 1)
      } else {
        if (isStart && brackets['}'] === brackets['{'] - 1) start = i
        if (isEnd && brackets['}'] === brackets['{']) {
          chunkOfObject += chunk.slice(start, i + 1)
          const message = JSON.parse(chunkOfObject)
          db.push(message)
          chunkOfObject = ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
})

function createFolders(message) {
  if (!message.folder) message.folder = 'Входящие'
  if (!allMessages[message.folder]) allMessages[message.folder] = []
  if (!staticFolders.includes(message.folder)) userFolders.add(message.folder)
  allMessages[message.folder].push(message)
}

function removeImgFromLetterAndMove(message) {
  if (Array.isArray(message.doc.img)) {
    message.imagesCount = message.doc.img.length
    imagesInLetters[message.id] = message.doc.img
  } else {
    message.imagesCount = 1
    imagesInLetters[message.id] = [message.doc.img]
  }
  message.doc.img = []
}

reader.on('end', () => {
  db.sort((a, b) => new Date(b.date) - new Date(a.date))
  for (let i = 0; i < db.length; i++) {
    db[i].id = i
    createFolders(db[i])
    if (db[i].doc) removeImgFromLetterAndMove(db[i])
  }

  server.listen(PORT, () => {
    const diffDate = (new Date() - startDate) / 1000
    console.log(`from entering a npm to turning on the server: ${diffDate}s`)
  })
})

const urlDecode = str => decodeURIComponent((str + '').replace(/\+/g, '%20'))

const server = http.createServer((req, res) => {
  const queriesParams = url.parse(req.url, true).query
  res.setHeader('Access-Control-Allow-Origin', '*')
  const folder = queriesParams.folder

  if (req.url.includes('getAllFolders')) {
    res.setHeader('Content-Type', MIME['json'])
    return res.end(JSON.stringify(Array.from(userFolders)))
  }

  if (req.url.includes('getMessagesByFolder')) {
    res.setHeader('Content-Type', MIME['json'])
    const page = queriesParams.page
    const limit = queriesParams.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let messages = allMessages[folder]
    return res.end(JSON.stringify(messages.slice(startIndex, endIndex)))
  }

  if (req.url.includes('/getLengthOfMessagesOfFolder')) {
    res.setHeader('Content-Type', MIME['json'])
    return res.end(JSON.stringify(allMessages[folder].length))
  }
  if (req.url.includes('/getImgById')) {
    res.setHeader('Content-Type', MIME['jpg'])
    const __img = imagesInLetters[+queriesParams.id][+queriesParams.id2]
    let image = Buffer.from(__img.split(',').at(-1), 'base64')
    return res.end(image)
  }

  const typeFile = req.url.split('.').at(-1)
  if (['js', 'css', 'svg'].includes(typeFile)) {
    res.setHeader('Content-Type', MIME[typeFile])
    const nameOfFile = req.url.split('/').at(-1)
    const file = path.join(distAssetsPath, urlDecode(nameOfFile))
    const source = fs.createReadStream(file)
    res.setHeader('Content-Encoding', 'br')
    const gzip = zlib.createBrotliCompress()
    return stream.pipeline(source, gzip, res, (e, b) => {})
    // return fs.readFile(file, (err, data) => res.end(data))
  }

  fs.readFile(path.join(distPath, 'index.html'), (err, data) => {
    res.setHeader('Content-Type', MIME['html'])
    return res.end(data)
  })
})

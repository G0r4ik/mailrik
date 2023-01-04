const getImgById = async (id, id2) => {
  const data = await fetch(
    `http://localhost:3000/getImgById?id=${id}&id2=${id2}`
  )
  return data.blob()
}

const getAllFolder = async () => {
  const data = await fetch(`http://localhost:3000/getAllFolders`)
  return data.json()
}

const getMessagesByFolder = async (folder, page, limit = 25) => {
  const data = await fetch(
    `http://localhost:3000/getMessagesByFolder?page=${page}&limit=${limit}&folder=${folder}`
  )
  return data.json()
}

const getLengthOfMessagesOfFolder = async folder => {
  const data = await fetch(
    `http://localhost:3000/getLengthOfMessagesOfFolder?folder=${folder}`
  )
  return data.json()
}

export default {
  getImgById,
  getMessagesByFolder,
  getLengthOfMessagesOfFolder,
  getAllFolder,
}

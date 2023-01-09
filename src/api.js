const getImgById = async (idOfMessage, imageNumber) => {
  const data = await fetch(
    `http://localhost:3000/getImgById?idOfMessage=${idOfMessage}&imageNumber=${imageNumber}`
  )
  return data.blob()
}

const getAllFolders = async () => {
  const data = await fetch(`http://localhost:3000/getAllFolders`)
  return data.json()
}

const getMessagesByFolder = async (folder, page, limit = 25, filters, sort) => {
  const filterString = JSON.stringify(filters)
  const data = await fetch(
    `http://localhost:3000/getMessagesByFolder?page=${page}&limit=${limit}&folder=${folder}&filter=${filterString}&sort=${sort}`
  )
  return data.json()
}

const getLengthOfMessagesOfFolder = async (folder, filters) => {
  const filterString = JSON.stringify(filters)
  const data = await fetch(
    `http://localhost:3000/getLengthOfMessagesOfFolder?folder=${folder}&filter=${filterString}`
  )
  return data.json()
}

export default {
  getImgById,
  getMessagesByFolder,
  getLengthOfMessagesOfFolder,
  getAllFolders,
}

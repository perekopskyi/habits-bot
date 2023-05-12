import * as fs from 'fs'
import { getAllDBData } from './firebase'

export const saveFirebaseDataToJson = async (path: string): Promise<void> => {
  try {
    const data = await getAllDBData()

    const currentDate = new Date()
      .toISOString()
      .replace(/:/g, '-')
      .split('.')[0]
    const fileName = `${path}/${currentDate}.json`
    const dirPath = `${path}/backups`
    fs.mkdirSync(dirPath, { recursive: true }) // создаем директорию, если ее нет

    fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
      if (err) throw err
      console.log(`Firebase data saved to ${fileName}`)
    })

    console.log('Firebase data saved to JSON file:', path)
  } catch (err) {
    console.error('Error saving Firebase data to JSON file:', err)
  }
}

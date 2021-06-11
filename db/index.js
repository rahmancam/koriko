import makeCourierDB from './courier-db'
import data from '../data/db.json'

export function makeDb (dbData = data) {
  return dbData
}

const courierDb = makeCourierDB({ makeDb })
export default courierDb

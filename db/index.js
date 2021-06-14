import makeCourierDB from './courier-db'
import data from '../data/db.json'

/**
 * Returns the static db.json from "data" folder
 * @param {Object} dbData
 * @returns {Object}
 */
export function makeDb (dbData = data) {
  return dbData
}

/**
 * Make courier db instance
 */
const courierDb = makeCourierDB({ makeDb })
export default courierDb

import fs from 'fs'
import path from 'path'
import { getAllPackagesFromShipments, handleEstimation } from './helpers/api-handler'
import { printPackages, writeToStdOutput } from './utils'

/**
 * program main
 */
async function main () {
  const filePath = path.join(__dirname, `../${process.argv[2]}`)
  const inputText = await readFile(filePath)
  try {
    handleEstimation(inputText, onCostEstimation, onTimeEstimation)
  } catch (error) {
    writeToStdOutput(error.message)
  }
}

/**
 * Cost Estimation callback
 * @param {Array<Package>} packages
 */
function onCostEstimation (packages) {
  printPackages(packages)
}

/**
 * Time Estimation callback
 * @param {Array<Shipment>} shipments
 */
function onTimeEstimation (shipments) {
  const packages = getAllPackagesFromShipments(shipments)
  printPackages(packages, true)
}

/**
 * Read file
 * @param {string} filePath
 * @returns {Promise}
 */
function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        writeToStdOutput(err.message)
      } else {
        const inputText = data.trim()
        resolve(inputText)
      }
    })
  })
}

// start main
main().catch(writeToStdOutput)

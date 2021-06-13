import React, { useRef, useState } from 'react'
import { getAllPackagesFromShipments, handleEstimation } from '../../app/helpers/api-handler'
import NavBar from '../components/Navbar'
import PackageEstimation from '../components/PackageEstimation'

/**
 * Home page
 * @returns {Object}
 */
export default function Home () {
  const inputFormat = []
  inputFormat.push('***Input Format***')
  inputFormat.push('BASE_COST NO_OF_PACKAGES')
  inputFormat.push('PKG_ID WEIGHT DISTANCE [OFFER (optional)]')
  inputFormat.push('PKG_ID WEIGHT DISTANCE [OFFER (optional)]')
  inputFormat.push('NO_VEHICLES MAX_SPEED MAX_LOAD')

  const validInputFormatPlaceHolder = inputFormat.join('\n')
  const textInputRef = useRef(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isTimeEstimation, setIsTimeEstimation] = useState(false)
  const [packages, setPackages] = useState(null)

  /**
   * Reset page to default state
   */
  const resetDefaults = () => {
    setPackages(null)
    setError(false)
    setErrorMessage('')
  }

  /**
   * Callback to handle cost estimation
   * @param {Array<Package>} packages
   */
  const onCostEstimation = (packages) => {
    setIsTimeEstimation(false)
    setPackages(packages)
  }

  /**
   * Callback to handle time estimation
   * @param {Array<Shipment>} shipments
   */
  const onTimeEstimation = (shipments) => {
    setIsTimeEstimation(true)
    const packages = getAllPackagesFromShipments(shipments)
    setPackages(packages)
  }

  /**
   * Submit to get the estimation
   * @param {Event} e
   */
  const onSubmit = (e) => {
    resetDefaults()
    try {
      handleEstimation(textInputRef.current.value, onCostEstimation, onTimeEstimation)
    } catch (error) {
      setError(true)
      setErrorMessage(error.message)
    }
  }

  /**
   * Load UseCase 1 and 2 problems
   * @param {number} problemId
   */
  const loadProblem = (problemId) => {
    resetDefaults()
    let text = ''
    switch (problemId) {
      case 1:
        text = '100 3\nPKG1 5 5 OFR001\nPKG2 15 5 OFR002\nPKG3 10 100 OFR003'
        break
      case 2:
        text = '100 5\nPKG1 50 30 OFR001\nPKG2 75 125 OFFR0008\nPKG3 175 100 OFFR003\nPKG4 110 60 OFR002\nPKG5 155 95 NA\n2 70 200'
        break
      default:
        break
    }
    textInputRef.current.value = text
  }

  return (
    <div>
      <NavBar />
      <div className='container-fluid'>
        <div className='form-container'>
          <div className='form-group'>
            <div>
              <form>
                <label htmlFor='inputBox'>Enter Input</label>
                <textarea ref={textInputRef} placeholder={validInputFormatPlaceHolder} className='form-control' id='inputBox' cols='100' rows='10' />
                {error && (
                  <div className='error-message'>
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
            <div className='buttons-group'>
              <button type='button' className='btn btn-sm btn-primary' onClick={(e) => loadProblem(1)}>Load Problem 1 (Use Case)</button>
              <button type='button' className='btn btn-sm btn-info' onClick={(e) => loadProblem(2)}>Load Problem 2 (Use Case)</button>
            </div>
          </div>
          <div className='submit-container'>
            <button type='submit' onClick={(e) => onSubmit()} className='btn btn-sm btn-dark'>Submit</button>
          </div>
          <div className='results-container'>
            {
              packages?.map && <PackageEstimation isTimeEstimation={isTimeEstimation} packages={packages} />
            }
          </div>
        </div>
      </div>
      <div className='git-project'>
        <a href='https://github.com/rahmancam/koriko' target='_blank' rel='noreferrer'>
          <img src='https://img.shields.io/github/stars/rahmancam/koriko?style=social' alt='Github' />
        </a>
      </div>
    </div>
  )
}

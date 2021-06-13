import React, { useRef, useState } from 'react'
import { getAllPackagesFromShipments, handleEstimation } from '../api'
import NavBar from '../components/Navbar'
import PackageEstimation from '../components/PackageEstimation'

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

  const resetDefaults = () => {
    setPackages(null)
    setError(false)
    setErrorMessage('')
  }

  const onCostEstimation = (packages) => {
    setIsTimeEstimation(false)
    setPackages(packages)
  }

  const onTimeEstimation = (shipments) => {
    setIsTimeEstimation(true)
    const packages = getAllPackagesFromShipments(shipments)
    console.log(packages)
    setPackages(packages)
  }

  const onSubmit = (e) => {
    resetDefaults()
    try {
      handleEstimation(textInputRef.current.value, onCostEstimation, onTimeEstimation)
    } catch (error) {
      setError(true)
      setErrorMessage(error.message)
    }
  }

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
    </div>
  )
}

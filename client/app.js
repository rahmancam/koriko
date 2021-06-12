import courierDB from '../db'
import React from 'react'
import ReactDOM from 'react-dom'

console.log(courierDB.findAllCoupons())

const Hello = () => (<div>This application rocks!!</div>)

ReactDOM.render(<Hello />, document.getElementById('root'))

import courierDB from '../db'
import React from 'react'
import ReactDOM from 'react-dom'

console.log(courierDB.findAllCoupons())

const Hello = () => (<div>Hello World</div>)

ReactDOM.render(<Hello />, document.getElementById('root'))

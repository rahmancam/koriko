/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react'

export default function PackageEstimation ({ isTimeEstimation = false, packages = [] }) {
  if (isTimeEstimation) {
    packages = [...packages]
    packages.sort((item1, item2) => item1.deliveryEstimateTimeHrs - item2.deliveryEstimateTimeHrs)
  }

  return (
    <div>
      {isTimeEstimation && <strong>*Ordered by Estimated Delivery Time</strong>}
      <table className='table'>
        <thead>
          <tr>
            <th>Pkg Id</th>
            <th>Discount</th>
            <th>Total Cost</th>
            {isTimeEstimation && <th>*Estimated Delivery Time (Hrs)</th>}
          </tr>
        </thead>
        <tbody>
          {
            packages && packages.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{`${item.discount} (${item.discountPercentage}%)`}</td>
                <td>{item.totalCost}</td>
                {isTimeEstimation && <td>{item.deliveryEstimateTimeHrs}</td>}
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  )
}

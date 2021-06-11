import baseEstimator from './cost-esitmator'

describe('Base Cost Estimator With Coupon', () => {
  test('Should throw error if no estimator provided', () => {
    expect(() => {
      baseEstimator({ baseCost: 0 })
    }).toThrow(TypeError)
  })
})

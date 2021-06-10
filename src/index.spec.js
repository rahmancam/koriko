import { add } from './index'

describe('Add', () => {
  test('should return valid output', () => {
    expect(add(5, 4)).toBe(9)
  })
})

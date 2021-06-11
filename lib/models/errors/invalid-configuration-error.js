export default class InvalidConfigurationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidConfigurationError'
  }
}

import InvalidConfigurationError from '../errors/invalid-configuration-error'

export default function validateSettingsOrThrowError ({ settings }) {
  if (!settings) {
    throw new InvalidConfigurationError('settings are not configured')
  }

  if (!settings.costPerKg) {
    throw new InvalidConfigurationError('costPerKg is not configured in settings')
  }

  if (settings.costPerKg <= 0) {
    throw new InvalidConfigurationError('costPerKg should not be zero or negative')
  }

  if (!settings.costPerKm) {
    throw new InvalidConfigurationError('costPerKm is not configured in settings')
  }

  if (settings.costPerKm <= 0) {
    throw new InvalidConfigurationError('costPerKm should be zero or negative')
  }
}

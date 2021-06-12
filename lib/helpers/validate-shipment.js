export default function validateShipmentOrThrowError ({ packages }) {
  if (!packages || !Array.isArray(packages) || packages.length <= 0) {
    throw new TypeError('Invalid packages provided to make new shipment')
  }
}


module.exports = normalize
module.exports.fromCoordinates = fromCoordinates
module.exports.fromLatlng = fromLatlng
module.exports.fromPoint = fromPoint
module.exports.fromString = fromString

module.exports.print = function print (input, fixed) {
  var ll = normalize(input)
  return ll.lng.toFixed(fixed || 5) + ', ' + ll.lat.toFixed(fixed || 5)
}

module.exports.toCoordinates = function toCoordinates (input) {
  var ll = normalize(input)
  return [ll.lng, ll.lat]
}

module.exports.toLatlng = function toLatlng (input) {
  return normalize(input)
}

module.exports.toPoint = function toPoint (input) {
  var ll = normalize(input)
  return {x: ll.lat, y: ll.lng}
}

module.exports.toString = function toString (input) {
  var ll = normalize(input)
  return ll.lng + ',' + ll.lat
}

function fromCoordinates (coordinates) {
  return floatize({lng: coordinates[0], lat: coordinates[1]})
}

function fromLatlng (latlng) {
  return floatize(latlng)
}

function fromPoint (point) {
  return floatize({lng: point.x, lat: point.y})
}

function fromString (str) {
  const arr = str.split(',')
  return floatize({lng: arr[0], lat: arr[1]})
}

function floatize (latlng) {
  return {lng: parseFloat(latlng.lng), lat: parseFloat(latlng.lat)}
}

function normalize (unknown) {
  if (!unknown) throw new Error('Value must not be null or undefined.')
  if (Array.isArray(unknown)) return fromCoordinates(unknown)
  else if (typeof unknown === 'string') return fromString(unknown)
  else if (unknown.x && unknown.y) return fromPoint(unknown)
  return floatize({lng: unknown.lng || unknown.lon || unknown.longitude, lat: unknown.lat || unknown.latitude})
}


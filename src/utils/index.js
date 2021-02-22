
const portfinder = require('portfinder')

const PORT = 5000;
const validPort = () => {
  return new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || PORT
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e test
        resolve(port)
      }
    })
  })
}

module.exports = validPort;

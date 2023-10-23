const createProxyMiddleware = require('http-proxy-middleware')
module.exports = app => {
  app.use(
    createProxyMiddleware(
      ['/api', '/socket.io'],
      {
        target: 'http://carrothunder.store',
        changeOrigin: true,
        ws: true,
        router: {
          '/socket.io': 'ws://carrothunder.store'
        }
      }
    )
  )
}
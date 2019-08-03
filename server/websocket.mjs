import WebSocket from 'ws';
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.send('hello!')
})

wss.on('close', ws => {
  ws.send('bye!')
})

wss.on('message', message => {
  console.log(`Received message => ${message}`)
})

export default wss;

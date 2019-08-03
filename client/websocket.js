import {wsUrl} from "../commons/config.mjs"
import {addDescriptionDispatch} from "./viewDispatchers.js"

export const wsEvents = ['addDescription'];

function connect(reactiveTasks) {
  const ws = new WebSocket(wsUrl)
  ws.onopen = () => {
    ws.send('HELLO')
  }
  ws.onmessage = ({data}) => {
    try {
      const json = JSON.parse(data)
      console.log(json)
      reactiveTasks.addDescription(json)
    }
    catch(e) {
      console.log(data)
    }
  }
  return ws;
}

export default connect;

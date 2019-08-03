import {wsUrl} from "../commons/config.mjs"

const connection = new WebSocket(wsUrl)
connection.onopen = () => {
  console.log('open')
}

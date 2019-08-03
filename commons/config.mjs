export const wsPort = '8080';
export const apiPort = '3000';
const server = `localhost:${apiPort}`;
const ws = `localhost:${wsPort}`;
export const serverUrl = `http://${server}/tasks/`;
export const wsUrl = `ws://${server}/ws`;

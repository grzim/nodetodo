export const debounce = () => {
  let rejector = () => {}
  return async function (time, data, callback, rejectCallback = () => {}, ...args) {
    rejector();
    const timeoutPromise = new Promise((resolve, reject) => {
      const id = setTimeout(resolve, time, data)
      rejector = () => {
        rejectCallback(...args);
        clearTimeout(id)
        reject();
      }
    })
    return await timeoutPromise
      .then(x => callback(x, ...args))
      .catch(() => console.log('jeszcze nie'))
  }
}

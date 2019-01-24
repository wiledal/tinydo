const listeners = {}

function onAppEvent (evt, callback) {
  if (!listeners[evt]) listeners[evt] = []
  listeners[evt].push(callback)
}

function triggerAppEvent (evt, data) {
  if (listeners[evt]) {
    listeners[evt].forEach(cb => {
      cb(data)
    })
  }
}

export {
  onAppEvent,
  triggerAppEvent
}
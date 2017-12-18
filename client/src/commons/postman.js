import postal from 'postal'

var localStorage = window.localStorage

if (!window.name) {
  window.name = 'AppName'
}

// 跨窗口详细发布者（监听 localStorage）
window.addEventListener('storage', function (e) {
  if (e.key === window.name) {
    var envolope = JSON.parse(e.newValue)
    if (envolope && envolope.topic) {
      pub({
        topic: envolope.topic,
        data: envolope.data
      })
    }
    localStorage.removeItem(e.key)
  }
}, false)

function sub (option) {
  var topic = option.topic
  var callback = option.callback
  return postal.subscribe({
    channel: window.name,
    topic: topic,
    callback: callback
  })
}

function pub (option) {
  var topic = option.topic
  var data = option.data
  var channel = option.channel || window.name
  if (!(channel instanceof Array)) {
    channel = [channel]
  }
  channel.forEach(function (c) {
    if (c !== window.name) {
      localStorage.setItem(c, JSON.stringify({
        topic: topic,
        data: data
      }))
    } else {
      postal.publish({
        channel: c,
        topic: topic,
        data: data
      })
    }
  })
}

export default {
  pub: pub,
  sub: sub
}

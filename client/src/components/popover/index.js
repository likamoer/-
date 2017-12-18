import './style.less'
import template from './view.html'
import postman from '../../commons/postman'

export default {
  data: function () {
    return {
      msgs: [],
      active: null,
      list: [],
      dict: {},
      limit: 5,
      timeout: 3000
    }
  },
  methods: {
    push: function (type, text) {
      let face = {
        success: 'fa fa-smile-o',
        warning: 'fa fa-meh-o',
        danger: 'fa fa-frown-o'
      }
      let key = '' + type + text
      let item = {
        key, type, text, face: face[type], show: true
      }
      if (!this.dict[key]) {
        this.dict[key] = true
        this.list.unshift(item)
        if (this.list.length > this.limit) {
          this.list.shift()
        }
        item.timeoutHandler = setTimeout(function () {
          this.close(item)
        }.bind(this), this.timeout += 1000)
      }
    },
    close: function (item) {
      if (item) {
        this.active = item
        this.active.show = false
      }
    },
    onMouseover: function (item) {
      clearTimeout(item.timeoutHandler)
    },
    onMouseleave: function (item) {
      setTimeout(function () {
        this.close(item)
      }.bind(this), this.timeout += 1000)
    },
    transitionBeforeEnter: function () {
      // console.log('beforeEnter');
    },
    transitionEnter: function () {
        // console.log('enter');
    },
    transitionAfterEnter: function () {
        // console.log('afterEnter');
    },
    transitionEnterCancelled: function () {
        // console.log('enterCancelled');
    },
    transitionBeforeLeave: function () {
        // console.log('beforeLeave');
    },
    transitionLeave: function () {
        // console.log('leave');
    },
    transitionAfterLeave: function () {
        // console.log('afterLeave');
      if (this.active) {
        this.list.$remove(this.active)
        delete (this.dict[this.active.key])
        this.active = null
        this.timeout -= 1000
      }
    },
    transitionLeaveCancelled: function () {
        // console.log('leaveCancelled');
    }
  },
  created: function () {
    this.msgs.push(postman.sub({
      topic: 'popover.info',
      callback: function (data) {
        this.push('info', data)
      }.bind(this)
    }))
    this.msgs.push(postman.sub({
      topic: 'popover.success',
      callback: function (data) {
        this.push('success', data)
      }.bind(this)
    }))
    this.msgs.push(postman.sub({
      topic: 'popover.warning',
      callback: function (data) {
        this.push('warning', data)
      }.bind(this)
    }))
    this.msgs.push(postman.sub({
      topic: 'popover.danger',
      callback: function (data) {
        this.push('danger', data)
      }.bind(this)
    }))
  },
  beforeDestroy: function () {
    this.msgs.forEach(function (item) {
      item.unsubscribe()
    })
  },
  template
}

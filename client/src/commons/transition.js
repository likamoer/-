/* 动画效果请参见 https://github.com/daneden/animate.css */
import '../../plugins/animate.css'

let _factory = function (enterClass, leaveClass) {
  let getVueObj = function (el) {
    let vueObj = el.__vue__ || el.__v_trans && el.__v_trans.vm || null
    return vueObj
  }

  return {
    beforeEnter: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionBeforeEnter instanceof Function && vueObj.transitionBeforeEnter()
      }
    },
    enter: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionEnter instanceof Function && vueObj.transitionEnter()
      }
    },
    afterEnter: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionAfterEnter instanceof Function && vueObj.transitionAfterEnter()
      }
    },
    enterCancelled: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionEnterCancelled instanceof Function && vueObj.transitionEnterCancelled()
      }
    },
    beforeLeave: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionBeforeLeave instanceof Function && vueObj.transitionBeforeLeave()
      }
    },
    leave: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionLeave instanceof Function && vueObj.transitionLeave()
      }
    },
    afterLeave: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionAfterLeave instanceof Function && vueObj.transitionAfterLeave()
      }
    },
    leaveCancelled: function (el) {
      let vueObj = getVueObj(el)
      if (vueObj) {
        vueObj.transitionLeaveCancelled instanceof Function && vueObj.transitionLeaveCancelled()
      }
    },
    enterClass, leaveClass
  }
}

export const bounceUD = _factory('bounceInUp', 'bounceOutDown')

export const bounceDU = _factory('bounceInDown', 'bounceOutUp')

export const bounceLR = _factory('bounceInLeft', 'bounceOutRight')

export const bounceRL = _factory('bounceInRight', 'bounceOutLeft')

export const fade = _factory('fadeIn', 'fadeOut')

export const fadeUD = _factory('fadeInUp', 'fadeOutDown')

export const fadeDU = _factory('fadeInDown', 'fadeOutUp')

export const fadeLR = _factory('fadeInLeft', 'fadeOutRight')

export const fadeRL = _factory('fadeInRight', 'fadeOutLeft')

export const slideUD = _factory('slideInUp', 'slideOutDown')

export const slideDU = _factory('slideInDown', 'slideOutUp')

export const slideLR = _factory('slideInLeft', 'slideOutRight')

export const slideRL = _factory('slideInRight', 'slideOutLeft')

export const zoom = _factory('zoomIn', 'zoomOut')

export const lightSpeed = _factory('lightSpeedIn', 'lightSpeedOut')

export const roll = _factory('rollIn', 'rollOut')

export const flipX = _factory('flipInX', 'flipOutX')

export const flipY = _factory('flipInY', 'flipOutY')

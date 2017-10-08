/**
 * Debounce
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
function debounce (func, wait = 12, immediate = true) {
  let timeout
  return function () {
    const context = this
    const args = arguments

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

/**
 * Shrink the header on scroll
 * @param event
 */
function shrinkOnScroll (event) {
  const target = document.querySelector('body')
  const logo = document.querySelector('.top-bar__logo')
  const isScrolled = target.classList.contains('scrolled')

  console.log(`target.scrollTop: ${target.scrollTop}, isScrolled: ${isScrolled}`)

  if (target.scrollTop > 50 && !isScrolled) {
    target.classList.add('scrolled')
  } else if (target.scrollTop <= 10 && isScrolled) {
    target.classList.remove('scrolled')
  }

  if (target.scrollTop > 400 && !logo.classList.contains('active')) {
    logo.classList.add('active')
  } else if (target.scrollTop < 400 && logo.classList.contains('active')) {
    logo.classList.remove('active')
  }
}

module.exports = {
  install: function (Vue, options) {
    Vue.directive('shrinkonscroll', {
      bind (el, binding, vnode) {
        // run the first time
        shrinkOnScroll({target: el})

        // add listener
        window.addEventListener('scroll', debounce(shrinkOnScroll))
      },

      update (el, binding) {
        // remove + add
        window.removeEventListener('scroll', debounce(shrinkOnScroll))
        window.addEventListener('scroll', debounce(shrinkOnScroll))
      },

      unbind (el, binding) {
        window.removeEventListener('scroll', debounce(shrinkOnScroll))
      }

    })
  }
}

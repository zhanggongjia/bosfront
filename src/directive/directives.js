import draggable from './module/draggable'
import clipboard from './module/clipboard'
import store from '@/store'
const directives = {
  draggable,
  clipboard,
  has: {
    inserted: function (el, binding) {
      if (store.state.user.access.indexOf(binding.value) < 0) {
        el.parentNode.removeChild(el)
      }
    }
  }
}

export default directives

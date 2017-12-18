/**
 * Created by xufengchao on 16/8/22.
 */
import './style.less'
import template from './template.html'
// import popover from '../components/popover/index'
import login from './login/index'
import system from './system/index'
export default{
  template,
  vuex: {},
  data () {
    return {
      activeView: 'system'
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    changeView: function () {
      this.activeView = (this.activeView === 'login' ? 'system' : 'login')
    }
  },
  components: {
    login,
    system
  }
}

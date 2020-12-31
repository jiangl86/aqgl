import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'


import loading from 'components/common/popup/loading';

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(loading)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
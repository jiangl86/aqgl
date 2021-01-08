import Vue from 'vue'
import './cube-ui'
import './vant'
import App from './App.vue'
import router from './router'
import store from './store'

import { DatePicker } from 'element-ui';


import loading from 'components/common/popup/loading';
import imageBrowse from 'components/common/popup/imagebrowse';

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(loading)
Vue.use(imageBrowse)

Vue.use(DatePicker)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
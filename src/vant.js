import Vue from 'vue'
import { Toast, Dialog } from 'vant';

Vue.use(Toast); //Toast使用见vant文档，可自写插件替代该组件，不用修改各个模块
Vue.use(Dialog); //Dialog使用见vant文档，可自写插件替代,主要是用得promise
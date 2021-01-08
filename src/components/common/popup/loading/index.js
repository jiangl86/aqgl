import Loading from './YuLoading'
import Vue from 'vue'
const obj = {}

obj.install = function() {
    //创建组件构造器
    const LoaingConstructor = Vue.extend(Loading)

    //2.new的方式，根据组件构造器，可以创建出来一个新的组件对象
    const loading = new LoaingConstructor()

    //3.将组件对象，手动的挂载到某一个dom元素上
    loading.$mount(document.createElement('div'))

    //将toast元素添加到document中
    document.body.appendChild(loading.$el)

    Vue.prototype.$loading = loading
}

export default obj
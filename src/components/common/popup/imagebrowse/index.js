import YuImageBrowse from './YuImageBrowse'
import Vue from 'vue'
const obj = {}

obj.install = function() {
    //创建组件构造器
    const ImageBrowseConstructor = Vue.extend(YuImageBrowse)

    //2.new的方式，根据组件构造器，可以创建出来一个新的组件对象
    const imageBrowse = new ImageBrowseConstructor()

    //3.将组件对象，手动的挂载到某一个dom元素上
    imageBrowse.$mount(document.createElement('div'))

    //将toast元素添加到document中
    document.body.appendChild(imageBrowse.$el)

    Vue.prototype.$imageBrowse = imageBrowse
}

export default obj
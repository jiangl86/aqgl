import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
    userId: null, //登录用户id
    token: null, //登录用户token
}


export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {}
})
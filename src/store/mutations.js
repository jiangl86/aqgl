import store from "."

export default {
    //更改用户信息
    changeUserInfo(state, userId, token) {
        state.userId = userId
        state.token = token
    },


}
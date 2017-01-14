// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import photos from './modules/photos' //照片管理
import users from './modules/users' //
import pageInfo from './modules/pageInfo';
import message from './modules/message';

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true, //使用严格模式
    modules: {
        photos:photos,
        users:users,
        message:message,
        pageInfo:pageInfo,
    }
})
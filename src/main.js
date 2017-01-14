// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import store from './store'
import router from './router'
import * as filters from './filters/'
import components from './components/' //加载公共组件
import FastClick from 'fastclick'
import {API_USERS_INFO} from './store/mutation-types'

Vue.use(VueResource)
Vue.http.options.root="http://photos.gophper.com"



Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

new Vue({ router,store }).$mount('#app')
FastClick.attach(document.body)
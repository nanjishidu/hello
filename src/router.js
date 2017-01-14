// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import Home from './page/home'
import Find from './page/find'
import Message from './page/message'
import PhotosInfo from './page/photos_info'
import My from './page/my'
import MyPersonal from './page/my_personal'
import MySetup from './page/my_setup'
import MyUserInfo from './page/my_userinfo'
import MyUpdatePasswd from './page/my_updatepasswd'
import MyPhotosList from './page/my_photoslist'
import MyFollowingList from './page/my_followinglist'
import MyFollowerList from './page/my_followerlist'
import MyPhotosLike from './page/my_photoslike'
import MyPhotosTipoff from './page/my_photostipoff'
import Login from './page/login'
import Register from './page/register'
import ForgetPasswd from './page/forget_passwd'
/* eslint-disable no-new */
Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/find', component: Find },
    { path: '/photos/info/:id', component: PhotosInfo },
    { path: '/message', component: Message },
    { path: '/my', component: My },
    { path: '/my/personal/:id', component: MyPersonal },
    { path: '/my/setup', component: MySetup },
    { path: '/my/userinfo', component: MyUserInfo },
    { path: '/my/updatepasswd', component: MyUpdatePasswd },
    { path: '/my/photos/list/:id', component: MyPhotosList },
    { path: '/my/following/list/:id', component: MyFollowingList },
    { path: '/my/follower/list/:id', component: MyFollowerList },
    { path: '/my/photos/like', component: MyPhotosLike },
    { path: '/my/photos/tipoff', component: MyPhotosTipoff },
    { path: '/login', meta: { auth: false }, component: Login },
    { path: '/register', meta: { auth: false }, component: Register },
    { path: '/forget_passwd', meta: { auth: false }, component: ForgetPasswd },
    { path: '*', redirect: '/login' }
]
// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    // new navigation.
    // scroll to anchor
    if (to.hash) {
      return { anchor: true }
    }
    // explicitly control scroll position
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      return { x: 0, y: 0 }
    }
  }
}
const router = new VueRouter({
     base: __dirname,
    scrollBehavior,
    routes,
    mode: 'history',
})
router.beforeEach(({ meta, path }, from, next) => {
    var { auth = true } = meta
    var isLogin = store.state.users.isLogin
    console.log(isLogin)
    if (auth && !isLogin) {
        if (!store.getters.isLogin) {
            return next({ path: '/login' })
        }
    }
    next()
})
export default router

// user.js
import Vue from 'vue'
import {
    API_USERS_FOLLOWING_LIST,
    API_USERS_FOLLOWER_LIST,
    API_USERS_FOLLOW_STATUS,
    API_USERS_FOLLOWING_ADD,
    API_USERS_FOLLOWING_DELETE,
    API_LOGIN,
    API_LOGOUT,
    API_USERS_INFO,
    API_USERS_PERSONAL_INFO,
    API_USERS_UPDATEPASSWD,
    API_FORGET_PASSWD,
    API_REGISTER,
    PAGE_STATUS,
} from '../mutation-types'

export default {
    state: {
        isLogin: false,
        followingData: [],
        followingPagenation: {},
        followerData: [],
        followerPagenation: {},
        personalUserinfo: {},
    },
    getters: {
        isLogin: function(state) {
            let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
            console.log(userinfo)
            if (!userinfo) {
                return false
            }
            return true
        },
        userInfo: function() {
            return JSON.parse(sessionStorage.getItem('userinfo')) || {}
        },
        userFollowingData: function(state) {
            return state.followingData
        },
        userFollowerData: function(state) {
            return state.followerData
        },
    },
    mutations: {
        [API_USERS_FOLLOWING_LIST](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.followingData = [];
                    state.followingPagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.followingData = payload.data.data;
            } else {
                state.followingData = state.followingData.concat(payload.data.data);
            }
            state.followingPagenation = payload.data.pagenation;
        },
        [API_USERS_FOLLOWER_LIST](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.followerData = [];
                    state.followerPagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.followerData = payload.data.data;
            } else {
                state.followerData = state.followerData.concat(payload.data.data);
            }
            state.followerPagenation = payload.data.pagenation;
        },
        [API_USERS_FOLLOWING_ADD](state, payload) {},
        [API_USERS_FOLLOWING_DELETE](state, payload) {},
        [API_USERS_FOLLOW_STATUS](state, payload) {
            let _data = [];
            if (payload.ptypes == "follower") {
                _data = state.followerData
            }
            if (payload.ptypes == "following") {
                _data = state.followingData
            }
            _data.forEach(function(item, index) {
                if (item.id == payload.id) {
                    if (payload.types == API_USERS_FOLLOWING_ADD) {
                        _data[index]["isfollow"] = true;
                    }
                    if (payload.types == API_USERS_FOLLOWING_DELETE) {
                        _data[index]["isfollow"] = false;
                    }
                }
            })
            if (payload.ptypes == "follower") {
                state.followerData = _data;
            } else if (payload.ptypes == "following") {
                state.followingData = _data;
            }
        },
        [API_LOGIN](state, payload) {
            if (payload.code == 200) {
                state.isLogin = true
            }
        },
        [API_LOGOUT](state, payload) {
            state.isLogin = false
            sessionStorage.removeItem('userinfo')
        },
        [API_USERS_INFO](state, payload) {
            sessionStorage.setItem("userinfo", JSON.stringify(payload.data));
        },
        [API_USERS_PERSONAL_INFO](state, payload) {
            state.personalUserinfo = payload.data
        },
        [API_USERS_UPDATEPASSWD](state, payload) {},
        [API_REGISTER](state, payload) {},
        [API_FORGET_PASSWD](state, payload) {},
    },
    actions: {
        [API_USERS_FOLLOWING_LIST]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/users/following/list", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_USERS_FOLLOWING_LIST, _data);
                    if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }
            });

        },
        [API_USERS_FOLLOWER_LIST]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/users/follower/list", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_USERS_FOLLOWER_LIST, _data);
                    if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }
            });

        },
        [API_USERS_FOLLOWING_ADD]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/users/following/add", { params: payload }).
            then(function(json) {
                commit(API_USERS_FOLLOWING_ADD, payload);
            });

        },
        [API_USERS_FOLLOWING_DELETE]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/users/following/delete", { params: payload }).
            then(function(json) {
                commit(API_USERS_FOLLOWING_DELETE, payload);
            });

        },
        [API_LOGIN]({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp(Vue.http.options.root + "/api/login", { params: payload }).
                then(function(json) {
                    commit(API_LOGIN, json.body);
                    resolve(json.body);
                });
            });
        },
        [API_LOGOUT]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/logout", { params: payload }).
            then(function(json) {
                commit(API_LOGOUT, json.body);
            });

        },
        [API_USERS_INFO]({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp(Vue.http.options.root + "/api/users/info", { params: payload }).
                then(function(json) {
                    commit(API_USERS_INFO, json.body);
                    resolve(json.body);
                });
            });
        },
        [API_USERS_PERSONAL_INFO]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/users/info", { params: payload }).
            then(function(json) {
                commit(API_USERS_PERSONAL_INFO, json.body);
            });
        },
        [API_USERS_UPDATEPASSWD]({ commit }, payload) {
            return new Promise(function(resolve, reject) {
                Vue.http.jsonp(Vue.http.options.root + "/api/users/updatepasswd", { params: payload }).then(function(json) {
                    resolve(json);
                });
            });

        },
        [API_REGISTER]({ commit }, payload) {
            return new Promise(function(resolve, reject) {
                Vue.http.jsonp(Vue.http.options.root + "/api/register", { params: payload }).then(function(json) {
                    resolve(json);
                });
            });
        },
        [API_FORGET_PASSWD]({ commit }, payload) {
            return new Promise(function(resolve, reject) {
                Vue.http.jsonp(Vue.http.options.root + "/api/forget_passwd", { params: payload }).then(function(json) {
                    resolve(json);
                });
            });
        },
    }
}

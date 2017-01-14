// photos.js
import Vue from 'vue'
import {
    API_PHOTOS_LIST,
    API_PHOTOS_INFO,
    API_PHOTOS_STATUS,
    API_PHOTOS_LIKE_ADD,
    API_PHOTOS_LIKE_DELETE,
    API_PHOTOS_LIKE_LIST,
    API_PHOTOS_TIPOFF_ADD,
    API_PHOTOS_TIPOFF_DELETE,
    API_PHOTOS_TIPOFF_LIST,
    API_USERS_FOLLOWING_ADD,
    API_USERS_FOLLOWING_DELETE,
    PAGE_STATUS,
} from '../mutation-types'

export default {
    state: {
        listData: [],
        listPagenation: {},
        followData: [],
        followPagenation: {},
        randData: [],
        randPagenation: {},
        likeData: [],
        likePagenation: {},
        tipoffData: [],
        tipoffPagenation: {},
        photosInfo: {},
    },
    getters: {
        findDatas: function(state) {
            var _data = state.randData
            if (index % 3 == 0) {
                if (_data.length - 2 >= index) {
                    let list = new Array()
                    list[0] = _data[index]
                    list[1] = _data[index + 1]
                    list[2] = _data[index + 2]
                    list3[index / 3] = list
                }

            }
            return list3;
        },
    },
    mutations: {
        [API_PHOTOS_INFO](state, payload) {
            state.photosInfo = payload.data
        },
        [API_PHOTOS_LIST](state, payload) {
            let _data, _dataPagenation;
            if (payload.ptype == "follow") {
                _data = state.followData;
                _dataPagenation = state.followPagenation;
            } else if (payload.ptype == "rand") {
                _data = state.randData;
                _dataPagenation = state.randPagenation;
            } else if (payload.ptype == "") {
                _data = state.listData;
                _dataPagenation = state.listPagenation;
            }
            if (payload.data.pagenation.page == 1) {
                _data = payload.data.data;
            } else {
                _data = _data.concat(payload.data.data);
            }
            state._dataPagenation = payload.data.pagenation;
            if (payload.ptype == "follow") {
                state.followData = _data
                state.followPagenation = _dataPagenation
            } else if (payload.ptype == "rand") {
                state.randData = _data
                state.randPagenation = _dataPagenation
            } else if (payload.ptype == "") {
                state.listData = _data
                state.listPagenation = _dataPagenation
            }
        },
        [API_PHOTOS_STATUS](state, payload) {
            let _data = [];
            if (payload.ptypes == "follow") {
                _data = state.followData;
            } else if (payload.ptypes == "rand") {
                _data = state.randData;
            } else if (payload.ptypes == "like") {
                _data = state.likeData;
            } else if (payload.ptypes == "tipoff") {
                _data = state.tipoffData;
            } else if (payload.ptypes == "") {
                _data = state.listData;
            } else if (payload.ptypes == "photosInfo") {
                if (payload.types == API_USERS_FOLLOWING_ADD) {
                    state.photosInfo.isfollow = true;
                }
                if (payload.types == API_USERS_FOLLOWING_DELETE) {
                    state.photosInfo.isfollow = false;
                }
                if (payload.types == API_PHOTOS_LIKE_ADD) {
                    state.photosInfo.islike = true;
                }
                if (payload.types == API_PHOTOS_LIKE_DELETE) {
                    state.photosInfo.islike = false;
                }
                if (payload.types == API_PHOTOS_TIPOFF_ADD) {
                    state.photosInfo.istipoff = true;
                }
                if (payload.types == API_PHOTOS_TIPOFF_DELETE) {
                    state.photosInfo.istipoff = false;
                }
            }
            _data.forEach(function(item, index) {
                if (item.usersid == payload.usersid) {
                    if (payload.types == API_USERS_FOLLOWING_ADD) {
                        _data[index]["isfollow"] = true;
                    }
                    if (payload.types == API_USERS_FOLLOWING_DELETE) {
                        _data[index]["isfollow"] = false;
                    }
                }
                if (item.id = payload.id) {
                    if (payload.types == API_PHOTOS_LIKE_ADD) {
                        _data[index]["islike"] = true;
                    }
                    if (payload.types == API_PHOTOS_LIKE_DELETE) {
                        _data[index]["islike"] = false;
                    }
                    if (payload.types == API_PHOTOS_TIPOFF_ADD) {
                        _data[index]["istipoff"] = true;
                    }
                    if (payload.types == API_PHOTOS_TIPOFF_DELETE) {
                        _data[index]["istipoff"] = false;
                    }
                }

            });
            if (payload.ptypes == "follow") {
                state.followData = _data;
            } else if (payload.ptypes == "rand") {
                state.randData = _data;
            } else if (payload.ptypes == "like") {
                state.likeData = _data;
            } else if (payload.ptypes == "tipoff") {
                state.tipoffData = _data;
            } else if (payload.ptypes == "") {
                state.listData = _data;
            }
        },
        [API_PHOTOS_LIKE_LIST](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.likeData = [];
                    state.likePagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.likeData = payload.data.data;
            } else {
                state.likeData = state.likeData.concat(payload.data.data);
            }
            state.likePagenation = payload.data.pagenation;
        },
        [API_PHOTOS_LIKE_ADD](state, rootState, payload) {

        },
        [API_PHOTOS_LIKE_DELETE](state, rootState, payload) {

        },
        [API_PHOTOS_TIPOFF_LIST](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.tipoffData = [];
                    state.tipoffPagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.tipoffData = payload.data.data;
            } else {
                state.tipoffData = state.tipoffData.concat(payload.data.data);
            }
            state.tipoffPagenation = payload.data.pagenation;
        },
        [API_PHOTOS_TIPOFF_ADD](state, rootState, payload) {

        },
        [API_PHOTOS_TIPOFF_DELETE](state, rootState, payload) {

        },
    },
    actions: {
        [API_PHOTOS_LIST]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/list", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_PHOTOS_LIST, { ptype: payload.ptype, data: _data.data });
                    if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }
            });
        },
        [API_PHOTOS_INFO]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/info", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_PHOTOS_INFO, { data: json.body.data });
                }
            });
        },
        [API_PHOTOS_LIKE_LIST]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/like/list", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_PHOTOS_LIKE_LIST, { data: _data.data });
                    if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }
            });
        },
        [API_PHOTOS_LIKE_ADD]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/like/add", { params: payload }).
            then(function(json) {
                commit(API_PHOTOS_LIKE_ADD, payload);
            });

        },
        [API_PHOTOS_LIKE_DELETE]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/like/delete", { params: payload }).
            then(function(json) {
                commit(API_PHOTOS_LIKE_DELETE, payload);
            });

        },
        [API_PHOTOS_TIPOFF_LIST]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/tipoff/list", { params: payload }).
            then(function(json) {
                let _data = json.body

                if (_data.code == 200) {
                    commit(API_PHOTOS_TIPOFF_LIST, { data: _data.data });
                    if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }
            });

        },
        [API_PHOTOS_TIPOFF_ADD]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/tipoff/add", { params: payload }).
            then(function(json) {
                commit(API_PHOTOS_TIPOFF_ADD, payload);
            });

        },
        [API_PHOTOS_TIPOFF_DELETE]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/photos/tipoff/delete", { params: payload }).
            then(function(json) {
                commit(API_PHOTOS_TIPOFF_DELETE, payload);
            });

        },
    }
}

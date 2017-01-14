// photos.js
import Vue from 'vue'
import {
    API_MESSAGE_USERS,
    API_MESSAGE_PHOTOS,
    PAGE_STATUS,
} from '../mutation-types'

export default {
    state: {
        usersData: [],
        usersPagenation: {},
        photosData: [],
        photosPagenation: {},
    },
    mutations: {
        [API_MESSAGE_USERS](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.usersData = [];
                    state.usersPagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.usersData = payload.data.data;
            } else {
                state.usersData = state.usersData.concat(payload.data.data);
            }
            state.usersPagenation = payload.data.pagenation;
        },
        [API_MESSAGE_PHOTOS](state, payload) {
            if (payload.page == 1) {
                if (!payload.data.pagenation || !payload.data.data) {
                    state.photosData = [];
                    state.photosPagenation = {};
                    return
                }
            }
            if (!payload.data.pagenation || !payload.data.data) {
                return
            }
            if (payload.data.pagenation.page == 1) {
                state.photosData = payload.data.data;
            } else {
                state.photosData = state.photosData.concat(payload.data.data);
            }
            state.photosPagenation = payload.data.pagenation;
        },
    },
    actions: {
        [API_MESSAGE_USERS]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/message/users", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_MESSAGE_USERS, { page: payload.page, data: _data.data });
                    if (!_data.data.pagenation || !_data.data.data) {
                        commit(PAGE_STATUS, false)
                    } else if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }

            });
        },
        [API_MESSAGE_PHOTOS]({ commit }, payload) {
            Vue.http.jsonp(Vue.http.options.root + "/api/message/photos", { params: payload }).
            then(function(json) {
                let _data = json.body
                if (_data.code == 200) {
                    commit(API_MESSAGE_PHOTOS, { page: payload.page, data: _data.data });
                    if (!_data.data.pagenation || !_data.data.data) {
                        commit(PAGE_STATUS, false)
                    } else if (_data.data.pagenation.page >= _data.data.pagenation.page_num) {
                        commit(PAGE_STATUS, false)
                    }
                }else{
                    console.log(_data.message)
                }
            });
        },
    }
}

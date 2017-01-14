// loading.js
import {PAGE_STATUS} from '../mutation-types';
import Vue from 'vue';

export default {
	state:{
		status:true
	},	
	mutations:{
		[PAGE_STATUS](state,payload){
			state.status = payload;
		}
	}
}

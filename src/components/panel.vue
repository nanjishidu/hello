<template>
<div class="v-panel">
    <div class="weui_panel">
    	<div class="weui-panel__hd">
            <a @click="gotoUserInfo(item.usersid)">{{item.usersname}}</a>
        </div>
        <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
        <img :src="imgurl"  alt="">
        <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">
                <template v-if="item.isfollow"><a @click="usersFollowingDelete(item.usersid)">取消关注</a></template>
                <template v-else><a @click="usersFollowingAdd(item.usersid)">关注</a></template>
            </li>
            <li class="weui-media-box__info__meta">
                <template v-if="item.islike"><a @click="photosLikeDelete(item.id)">取消喜欢</a></template>
                <template v-else><a @click="photosLikeAdd(item.id)">喜欢</a></template>
            </li>
            <li class="weui-media-box__info__meta">
                 <template v-if="item.istipoff"><a @click="photosTipoffDelete(item.id)">取消举报</a></template>
                <template v-else><a @click="photosTipoffAdd(item.id)">举报</a></template>
            </li>
            <li class="weui-media-box__info__meta" style="float:right">
                <!-- 发布于:{{item.datetime|formatDate}} -->
                发布于: {{item.datetime}}
            </li>
        </ul> 
        </div>
        </div>
    </div>
</div>
</template>
<script>
import { 
    API_USERS_FOLLOWING_ADD,
    API_USERS_FOLLOWING_DELETE,
    API_PHOTOS_LIKE_ADD,
    API_PHOTOS_LIKE_DELETE,
    API_PHOTOS_TIPOFF_ADD,
    API_PHOTOS_TIPOFF_DELETE,
    API_PHOTOS_STATUS,
} from '../store/mutation-types'
export default {
    name:"v-panel",
	props:["item","imgurl","ptype"],
	data(){
		return {
		}
	},
	methods: {
    	usersFollowingAdd(usersid){
    	    this.$store.dispatch(API_USERS_FOLLOWING_ADD,{id:usersid});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_USERS_FOLLOWING_ADD,ptypes:this.ptype,usersid:usersid});
    	},
    	usersFollowingDelete(usersid){
    	    this.$store.dispatch(API_USERS_FOLLOWING_DELETE,{id:usersid});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_USERS_FOLLOWING_DELETE,ptypes:this.ptype,usersid:usersid});
    	},
    	photosLikeAdd(id){
    	    this.$store.dispatch(API_PHOTOS_LIKE_ADD,{id:id});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_PHOTOS_LIKE_ADD,ptypes:this.ptype,id:id});
    	},
    	photosLikeDelete(id){
    	    this.$store.dispatch(API_PHOTOS_LIKE_DELETE,{id:id});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_PHOTOS_LIKE_DELETE,ptypes:this.ptype,id:id});
    	},
    	photosTipoffAdd(id){
    	    this.$store.dispatch(API_PHOTOS_TIPOFF_ADD,{id:id});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_PHOTOS_TIPOFF_ADD,ptypes:this.ptype,id:id});
    	},
    	photosTipoffDelete(id){
    	    this.$store.dispatch(API_PHOTOS_TIPOFF_DELETE,{id:id});
    	    this.$store.commit(API_PHOTOS_STATUS,{types:API_PHOTOS_TIPOFF_DELETE,ptypes:this.ptype,id:id});
    	},
        gotoUserInfo(id){
            this.$router.push('/my/personal/'+id);
        },
    },
}
</script>
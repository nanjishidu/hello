<template>
<div class="my_follow">
    <!-- 容器 -->
    <div class="weui-tab">
    	<v-header :canBack="true"><span slot="center">我的关注</span></v-header >
      <div class="weui-tab__bd">
        <div id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active infinite">
            <template v-for="item in list">
            	<div class="weui-cell">
                <div class="weui-cell__hd"><img src=""></div>
                <div class="weui-cell__bd">
                  <a @click="openUserInfo(item.id)">{{item.name}}</a>
                </div>
                <div class="weui-cell__ft">
                	<template v-if="item.isfollow"><a @click="usersFollowingDelete(item.id)">取消关注</a></template>
                	  <template v-else><a @click="usersFollowingAdd(item.id)">关注</a></template>
               </div>
              </template>
        </div>
          <v-page-info :page="page" :pageSize="pageSize" :callback="followingPageAdd" ></v-page-info>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import { 
API_USERS_FOLLOWING_LIST,
API_USERS_FOLLOW_STATUS,
API_USERS_FOLLOWING_ADD,
API_USERS_FOLLOWING_DELETE,
PAGE_STATUS,
} from '../store/mutation-types'
export default {
  name: 'message',
  data () {
    return {
        page:1,pageSize:20,
        tabNum:1,
    }
  },
  computed: {
    list:function(){
        return this.$store.getters.userFollowingData;
    },
    pagenation:function(){
        return this.$store.state.users.followingPagenation;
    },
  },
  methods: {
  	openUserInfo(id){
        this.$router.push('/my/personal/'+id);
    },
    followingPageAdd(page,pageSize){
      this.page = page;
      this.getUsersFollowingList();
    },
    getUsersFollowingList(){
        this.$store.dispatch(API_USERS_FOLLOWING_LIST,{page:this.page,
            pageSize: this.pageSize,id:this.$route.params.id});
    },
    usersFollowingAdd(usersid){
    	this.$store.dispatch(API_USERS_FOLLOWING_ADD,{id:usersid});
         this.$store.commit(API_USERS_FOLLOW_STATUS,{types:API_USERS_FOLLOWING_ADD,id:usersid,ptypes:"following"});
    },
    usersFollowingDelete(usersid){
    	this.$store.dispatch(API_USERS_FOLLOWING_DELETE,{id:usersid});
         this.$store.commit(API_USERS_FOLLOW_STATUS,{types:API_USERS_FOLLOWING_DELETE,id:usersid,ptypes:"following"});
    },
  },
  created:function(){
    this.getUsersFollowingList();
    if (this.pagenation.page>=this.pagenation.page_num){
            this.$store.commit(PAGE_STATUS,false)
     }
  }
}
</script>



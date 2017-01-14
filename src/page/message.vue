<template>
<div class="message">
    <!-- 容器 -->
    <div class="weui-tab">
      <div class="weui-navbar">
         <div class="weui-navbar__item weui-navbar__item--on" href="#tab1" @click="switchTab(1)">
          关注用户动态
        </div>
        <div class="weui-navbar__item" href="#tab2"  @click="switchTab(2)">
          关注用户照片
        </div>
      </div>
      <div class="weui-tab__bd">
        <div id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active infinite">
            <template v-for="item in messageUsersList">
              <div class="weui-cell">
                <div class="weui-cell__hd"><img src=""></div>
                <div class="weui-cell__bd">
                    <a @click="gotoUserInfo(item.usersid)">{{item.usersname}}</a>
                    <span>关注了</span>
                    <a @click="gotoUserInfo(item.followid)">{{item.followname}}</a>
                </div>
                <div class="weui-cell__ft"></div>
              </div>
          </template>
        </div>
        <div id="tab2" class="weui-tab__bd-item infinite">
          <template v-for="item in messagePhotosList">
            <div class="weui-cell">
              <div class="weui-cell__hd"></div>
              <div class="weui-cell__bd">
                <a @click="gotoUserInfo(item.usersid)">{{item.usersname}}</a>
                <span>喜欢了</span>
                <a @click="gotoUserInfo(item.photosusersid)">{{item.photosusersname}}</a>
                <span>的照片</span>
              </div>
              <div class="weui-cell__ft">
              <a @click="gotoPhotosInfo(item.photosid)">
                <img width="60" :src="thumbnailsImg(item.url)">
              <a>
              </div>
            </div>
          </template>
        </div>
          <v-page-info :page="page" :pageSize="pageSize" :callback="messagePageAdd" ></v-page-info>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import { 
API_MESSAGE_USERS,
API_MESSAGE_PHOTOS,
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
    messageUsersList:function(){
        return this.$store.state.message.usersData;
    },
    messageUsersPagenation:function(){
        return this.$store.state.message.usersPagenation;
    },
    messagePhotosList:function(){
        return this.$store.state.message.photosData;
    },
    messagePhotosPagenation:function(){
        return this.$store.state.message.photosPagenation;
    },
  },
  methods: {
    gotoUserInfo(id){
        this.$router.push('/my/personal/'+id);
    },
    gotoPhotosInfo(id){
        this.$router.push('photos/info/'+id);
    },
    switchTab(num){
        this.tabNum = num;
        this.page = 1;
        if (this.tabNum == 2){
           this.getMessagePhotosList();
        }else{
           this.getMessageUsersList();
        }
    },
    messagePageAdd(page,pageSize){
      this.page = page;
      if(this.tabNum == 2){
        this.getMessagePhotosList();
      }else{
        this.getMessageUsersList();
      }
    },
    getMessageUsersList(){
        this.$store.dispatch(API_MESSAGE_USERS,{page:this.page,
            pageSize: this.pageSize});
    },
    getMessagePhotosList(){
        this.$store.dispatch(API_MESSAGE_PHOTOS,{page:this.page,
            pageSize: this.pageSize});
    },
    thumbnailsImg(imgUrl){
        return imgUrl + "?imageView2/0/w/120/h/120";
    },
  },
  created:function(){
    this.getMessageUsersList();
  }
}
</script>



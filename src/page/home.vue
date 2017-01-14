<template>
  <div class="weui-tab">
      <v-header><span slot="center">首页</span></v-header >
      <div id="list" class="weui-tab__bd">
          <div class="weui-tab__bd-item weui-tab__bd-item--active infinite">
          <template v-for="item in list">
            <v-panel :item="item" :imgurl="item.url" :ptype="ptype"></v-panel>
          </template>
          <v-page-info :page="page" :pageSize="pageSize" :callback="homePageAdd"></v-page-info>
          </div>
      </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { 
API_PHOTOS_LIST,
API_PHOTOS_STATUS,
PAGE_STATUS,
} from '../store/mutation-types'
export default {
  name: 'home',
  data () {
     return {home_page:"home_page",page:1,pageSize:10,orderBy:"date",ptype:"follow"}
  },
  computed: {
    list:function(){
        return this.$store.state.photos.followData;
    },
    pagenation:function(){
        return this.$store.state.photos.followPagenation;
    },
  },
  methods: {
    homePageAdd(page,pageSize){
        this.page = page;
        this.getHomePhotosList();
    },
    gotoUserInfo(usersid){
        this.$router.push("/users/info/"+usersid)
    },
    getHomePhotosList(){
        this.$store.dispatch(API_PHOTOS_LIST,{page:this.page,
            pageSize: this.pageSize,
            orderBy:this.orderBy,
            ptype:this.ptype});
    }
  },
  created:function(){
      if(!this.pagenation.page||this.pagenation.page==1){
             this.getHomePhotosList()
      }else{
          if (this.pagenation.page>=this.pagenation.page_num){
            this.$store.commit(PAGE_STATUS,false)
          }
      }   
  }
}
</script>


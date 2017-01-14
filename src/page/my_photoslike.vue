<template>
  <div class="weui-tab">
      <v-header :canBack="true"><span slot="center">赞过的图片</span></v-header >
      <div id="list" class="weui-tab__bd">
          <div class="weui-tab__bd-item weui-tab__bd-item--active infinite">
          <template v-for="item in list">
            <v-panel :item="item" :imgurl="item.url" :ptype="ptype"></v-panel>
          </template>
          <v-page-info :page="page" :pageSize="pageSize" :callback="photosLikePageAdd"></v-page-info>
          </div>
      </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { 
API_PHOTOS_LIKE_LIST,
PAGE_STATUS,
} from '../store/mutation-types'
export default {
  name: 'photos_like',
  data () {
     return {page:1,
     		pageSize:10,
     		ptype:"like",
     }
  },
  computed: {
  	list:function(){
        return this.$store.state.photos.likeData;
    },
    pagenation:function(){
        return this.$store.state.photos.likePagenation;
    },
  },
  methods: {
    photosLikePageAdd(page,pageSize){
        this.page = page;
        this.getPhotosLikeList();
    },
    getPhotosLikeList(){
        this.$store.dispatch(API_PHOTOS_LIKE_LIST,{page:this.page,
            pageSize: this.pageSize})
    },
  },
  created:function(){
       	this.getPhotosLikeList()
       	if (this.pagenation.page>=this.pagenation.page_num){
            this.$store.commit(PAGE_STATUS,false)
         }
      
  }
}
</script>


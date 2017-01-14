<template>
  <div class="weui-tab">
      <v-header :canBack="true"><span slot="center">举报的图片</span></v-header >
      <div id="list" class="weui-tab__bd">
          <div class="weui-tab__bd-item weui-tab__bd-item--active infinite">
          <template v-for="item in list">
            <v-panel :item="item" :imgurl="item.url" :ptype="ptype"></v-panel>
          </template>
          <v-page-info :page="page" :pageSize="pageSize" :callback="photosTipoffPageAdd"></v-page-info>
          </div>
      </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { 
API_PHOTOS_TIPOFF_LIST,
PAGE_STATUS,
} from '../store/mutation-types'
export default {
  name: 'photos_tipoff',
  data () {
     return {page:1,
     		pageSize:10,
     		ptype:"tipoff",
     }
  },
  computed: {
  	list:function(){
        return this.$store.state.photos.tipoffData;
    },
    pagenation:function(){
        return this.$store.state.photos.tipoffPagenation;
    },
  },
  methods: {
    photosTipoffPageAdd(page,pageSize){
        this.page = page;
        this.getPhotosTipoffList();
    },
    getPhotosTipoffList(){
        this.$store.dispatch(API_PHOTOS_TIPOFF_LIST,{page:this.page,
            pageSize: this.pageSize})
    },
  },
  created:function(){
       	this.getPhotosTipoffList()
      	if (this.pagenation.page>=this.pagenation.page_num){
            this.$store.commit(PAGE_STATUS,false)
        }
  }
}
</script>


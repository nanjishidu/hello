<!-- photoInfo.vue -->
<template>
<div class="photo-info">
    <div class="weui_tab">
        <v-header :canClose="true"><span slot="center"></span></v-header>
        <v-panel :item="photosInfo" :imgurl="photosInfo.url" ptype="photosInfo"></v-panel>
        <div class="photos-space"></div>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import { 
API_PHOTOS_INFO,
} from '../store/mutation-types'
export default {
  name: 'photos_info',
  data () {
    return {
    }
  },
  computed: {
  	photosInfo:function(){
        return this.$store.state.photos.photosInfo;
    },
  },
  methods:{
  	getPhotosInfo:function(){
  		this.$store.dispatch(API_PHOTOS_INFO,{id:this.$route.params.id});
  	}
  },
  created:function(){
    this.getPhotosInfo();
  }

}
</script>



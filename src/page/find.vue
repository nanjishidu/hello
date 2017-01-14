<template>
    <div class="find weui-tab">
        <v-header><span slot="center">发现</span></v-header>
        <div id="list" class="weui-tab__bd infinite">
            <v-list :data="list"></v-list>
            <v-page-info :page="page" :pageSize="pageSize" :callback="findPageAdd"></v-page-info>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import { API_PHOTOS_LIST,API_PHOTOS_POPUP } from '../store/mutation-types'
export default {
    name: 'find',
    data () {
        return {
            find_page:"find_page",
            page:1,
            pageSize:30,
            orderBy:"date",
            ptype:"rand",
        }
    },
    computed: {
        list:function(){
            return this.$store.getters.findDatas;
        },
        pagenation:function(){
            return this.$store.state.photos.randPagenation;
        },
        // imgWidth:function(){
        //     return Math.floor($(window).width() / 2.5)
        // },

    },
    methods: {
        findPageAdd(page,pageSize){
                this.page = page;
                this.getRandPhotosList();
        },
        getRandPhotosList(){
                this.$store.dispatch(API_PHOTOS_LIST,{page:this.page,
                pageSize: this.pageSize,
                orderBy:this.orderBy,
                ptype:this.ptype});
        },
    },
    created:function(){
        if(!this.pagenation.page||this.pagenation.page==1){
          this.getRandPhotosList()
        }else{
            if (this.pagenation.page>=this.pagenation.page_num){
                this.$store.commit(PAGE_STATUS,false)
            }
        }   
    }
}
</script>

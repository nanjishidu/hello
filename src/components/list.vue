<template>
	<div class="v-list">
	<template v-for="(item, index) in data" >
	        <div class="weui-flex">
	            <div class="weui-flex__item"  v-for="(ik, iv) in item">
	                <router-link :to="openPhoto(ik.id)">
	                    <img :src="thumbnailsImg(ik.url)" alt="" >
	                </router-link>
	            </div>
	        </div>
	</template>
	</div>
</template>
<script>
//list列表 默认每行显示3个
export default {
    name: 'list',
    props:["data"],
    data () {
        return {}
    },
    computed: {
        screenWidth:function(){
            return $(window).width()
        }
    },
    methods: {
        thumbnailsImg(imgUrl){
            return imgUrl + "?imageView2/0/w/" + this.screenWidth+ "/h/" + this.screenWidth;
        },
        openPhoto(id){
            return "/photos/info/"+id;
        },
    },
}
</script>
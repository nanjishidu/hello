<template>
<div class="v-page-info">
	<div class="weui-loadmore" v-if="status">
      	<i class="weui-loading"></i>
      	<span class="weui-loadmore__tips">正在加载...</span>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-else>
		 <span class="weui-loadmore__tips">加载完成</span>
	</div>
</div>
</template>

<script>
import {PAGE_STATUS} from '../store/mutation-types';
export default {
	name:"v-page-info",
	props:["page","pageSize","callback"],
	data(){
		return {}
	},
	computed:{
		status:function(){
			return this.$store.state.pageInfo.status;
		}
	},
	created:function(){
		var _this = this;
		var loading = false;
		$(document.body).infinite(200);
		$(document.body).infinite().on("infinite", function() {
			if(!_this.status)return;
			if(loading) return;
		  	loading = true;
		  	setTimeout(function() {
			  	_this.callback ? _this.callback(_this.page+1,_this.pageSize) : '';
			    loading = false;
		    }, 1000);   //太快了故意延迟
		});
	},
	destroyed:function(){
		this.$store.commit(PAGE_STATUS,true);
		$(document.body).off("infinite");
		// $(document.body).destroyInfinite();
	}
}
</script>
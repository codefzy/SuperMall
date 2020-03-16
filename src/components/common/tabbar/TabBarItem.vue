<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!IsActive">
			<slot name="itemIcon"></slot>
		</div>
		<div v-else>
			<slot name="itemIconActive"></slot>
		</div>
		<div :style="activeStyle">
			<slot name="itemText"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
		  return{
			  // IsActive:true
		  }
		},
		computed:{
			IsActive(){
				return this.$route.path.indexOf(this.path)!=-1;
			},
			activeStyle(){
				return this.IsActive?{color:this.defineColor}:{};
			}
		},
		props:{
			path: String,
			defineColor:{
				type:String,
				default:'red'
			}
		},
		methods:{
			itemClick(){

				this.$router.push(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
		margin-top: 3px;
	}
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
</style>

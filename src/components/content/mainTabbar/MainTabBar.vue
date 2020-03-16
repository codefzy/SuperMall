<template>
	<tabbar>
		<tabbarItem path="/home">
			 <!-- 在 src href 等标签内的路径，你要使用到别名，必须在别名前面加上 ~ 这个符号 -->
			<template v-slot:itemIcon><img src="~assets/img/tabbar/home.svg"></template>
			<template v-slot:itemIconActive><img src="~assets/img/tabbar/home_active.svg"></template>
			<template v-slot:itemText><p>首页</p></template>
		</tabbarItem>
		<tabbarItem path="/category">
			<template v-slot:itemIcon><img src="~assets/img/tabbar/category.svg"></template>
			<template v-slot:itemIconActive><img src="~assets/img/tabbar/category_active.svg"></template>
			<template v-slot:itemText><p>分类</p></template>
		</tabbarItem>
		<tabbarItem path="/showcart">
			<template v-slot:itemIcon><img src="~assets/img/tabbar/shopcart.svg"></template>
			<template v-slot:itemIconActive><img src="~assets/img/tabbar/shopcart_active.svg"></template>
			<template v-slot:itemText><p>购物车</p></template>
		</tabbarItem>
		<tabbarItem path="/profile">
			<template v-slot:itemIcon><img src="~assets/img/tabbar/profile.svg"></template>
			<template v-slot:itemIconActive><img src="~assets/img/tabbar/profile_active.svg"></template>
			<template v-slot:itemText><p>我的</p></template>
		</tabbarItem>
	</tabbar>
</template>

<script>
	// 这种 import 就可以正常使用别名
	import tabbar from 'components/common/tabbar/TabBar.vue'
	import tabbarItem from 'components/common/tabbar/TabBarItem.vue'

	export default {
	  name: 'MainTabBar',
	  components:{
		  tabbar,
		  tabbarItem
	    }
	}
</script>

<style>
</style>

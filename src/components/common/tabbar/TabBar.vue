<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name:"TabBar",
    watch(){

    }
  }
</script>

<style>
	#tab-bar{
		display: flex;
		background: #f6f6f6;
		width: 100%;
		position: fixed;
		bottom: 0;
		box-shadow: 0 1px 1px 1px rgba(100,100,100,0.8);
	}
</style>

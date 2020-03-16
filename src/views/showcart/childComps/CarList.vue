<template>
   <div class="cartList">
      <scroll class="content" ref="scroll">
        <carListItem v-for="(item,index) in CarList" :itemInfo="item" :key="index"></carListItem>
      </scroll>
   </div>
</template>

<script>
    import scroll from 'components/common/scroll/Scroll.vue'
    import carListItem from './CarListItem'
    import {mapGetters} from 'vuex'
    export default {
        name: "CarList",
        computed:{
          ...mapGetters(['CarList'])
        },
      components:{
        scroll,
        carListItem
      },
      activated(){
          // 最好在路由激活的时候刷新一下，不然滚动不了
          this.$refs.scroll.refresh();
      }
    }
</script>

<style scoped>
    .cartList{
      height: calc(100% - 44px - 49px - 40px);
    }
    .content{
      height: 100%;
      overflow: hidden;
    }
</style>

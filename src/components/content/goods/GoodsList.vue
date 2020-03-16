<template>
    <div class="goods">
      <GoodsListItem v-for="item in goods" :goodsItem="item"></GoodsListItem>
    </div>
</template>

<script>
   import GoodsListItem from './GoodsListItem.vue'
    export default {
      name: "GoodsList",
      components:{
        GoodsListItem
      },
      props:{
        goods:{
         type:Array,
         default(){
           return []
         }
        }
      }
    }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;  /*会根据宽度来自己判定一行显示多少个，而不是全部塞进一行*/
    justify-content: space-around;
    padding: 2px;
  }
</style>

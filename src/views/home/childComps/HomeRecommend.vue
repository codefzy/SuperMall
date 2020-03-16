<template>
   <div class="recommend">
     <div class="recommend-item" v-for="item in recommends">
       <a :href="item.link">
         <img :src="item.image" alt="">
         <p>{{item.title}}</p>
       </a>
     </div>
   </div>
</template>

<script>
    export default {
        name: "HomeRecommend",
        props:{
          recommends:{
            type:Array,
            default(){
              return []
            }
          }
        }
    }
</script>

<style scoped>
    .recommend{
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0 20px;
      border-bottom: 8px solid #eee;
    }
    .recommend-item{
      flex: 1;
    }
    .recommend-item img{
      max-width: 100%;
    }
</style>

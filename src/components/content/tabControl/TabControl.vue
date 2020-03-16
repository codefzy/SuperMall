<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:currentIndex==index}" @click="itemClick(index)">
          <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
        },
        data(){
            return{
              currentIndex:0
            }
        },
        methods:{
            itemClick(index){
              this.currentIndex=index;
              this.$emit('tabClick',index);
            }
        }
    }
</script>

<style scoped>
    .tab-control{
      width: 100%;
      line-height: 40px;
      display: flex;
      text-align: center;
      font-size: 12px;
      background: #ffffff;
    }
    .tab-control-item{
      flex: 1;
    }
    .active{
      color: var(--color-high-text);
    }
    .active span{
      padding: 3px;
      border-bottom: 3px solid var(--color-tint);
    }

</style>

<template>
    <div>
      <navbar>
        <template v-slot:left>
          <img src="~assets/img/common/back.svg" alt="" @click="backClick">
        </template>

        <template v-slot:center>
          <div class="title">
            <div v-for="(item,index) in titles" class="title-item"
                 @click="itemClick(index)" :class="{active:index==CurrentIndex}">{{item}}</div>
          </div>
        </template>
      </navbar>
    </div>
</template>

<script>
    import navbar from 'components/common/navbar/NavBar.vue'
    export default {
      name: "DetailNavBar",
      components:{
        navbar
      },
      data(){
        return{
          titles:['商品','参数','评论','推荐'],
          CurrentIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.CurrentIndex = index;
          console.log("--------"+this.CurrentIndex)
          this.$emit('DetailNavClick',index);
        },
        backClick(){
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  img{
    margin-top: 10px;
  }
</style>

<template>
    <div class="toast" v-show="isShow">
      <div >
        {{message}}
      </div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      data(){
        return{
          isShow:false,
          message:''
        }
      },
      methods:{
        show(message,duration=2000){

          console.log("我是 Toast 组件中的方法 show 方法")
          this.isShow = true;
          this.message = message;

          setTimeout(()=>{

            this.isShow = true;
            this.message = '';

          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.65);
    /*padding: 8px 10px;*/
    color: #ffffff;
    z-index: 999;
  }
</style>

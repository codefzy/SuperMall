<template>
    <div class="bottomBar">
      <div class="check-content">
        <checkButton class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></checkButton>
        <span>全选</span>
      </div>
      <div class="TotalPrice">
        合计：￥{{totalPrice}}
      </div>
      <div class="calculate">
        去结算({{checkLenght}})
      </div>
    </div>
</template>

<script>
    import checkButton from 'components/content/checkButton/CheckButton.vue'
    import {mapGetters} from 'vuex'
    export default {
      name: "CarBottomBar",
      components:{
        checkButton
      },
      computed:{
        ...mapGetters(['CarList']),
        totalPrice(){
          return this.$store.state.cartList.filter(item=>{
            return item.checked;
          }).reduce((preValue,item)=>{

              return preValue+item.realPrice*item.count;
          },0)
        },
        checkLenght(){
          return this.CarList.filter(item=>item.checked).length
        },

        isSelectAll(){

          if(this.CarList.length===0){

            return false;
          }

          return !(this.CarList.filter(item=>!item.checked).length);
        }
      },
      methods:{
        checkClick(){

          if(this.isSelectAll){

            this.CarList.forEach(item=>item.checked=false);
          }else{

            this.CarList.forEach(item=>item.checked=true);
          }
        }
      }
    }
</script>

<style scoped>
    .bottomBar{
      height: 40px;
      background: #eee;
      position: relative;
      display: flex;
      line-height: 40px;
    }
    .check-content{
      display: flex;
      align-items: center;
      line-height: 40px;
      margin: 0 5px 0 10px;
      width: 60px;
    }
    .TotalPrice{
      flex: 1;
    }
    .check-button{
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    .calculate{
      width: 90px;
      text-align: center;
      color: #ffffff;
      background: red;
      /*font-size: 12px;*/
    }
</style>

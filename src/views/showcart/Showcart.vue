<template>
	<div class="showCart">
    <navbar class="car-navbar">
      <template v-slot:center>
         <div>购物车({{CarLenght}})</div>
      </template>
    </navbar>
    <carList></carList>
    <CarBottomBar></CarBottomBar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import carList from './childComps/CarList.vue'
  import CarBottomBar from './childComps/CarBottomBar.vue'
  import navbar from 'components/common/navbar/NavBar.vue'
  export default {
    name:'Showcart',
    components:{
      navbar,
      carList,
      CarBottomBar
    },
    computed:{
      // 这里 ...mapGetters 相当于把 vuex中的getters中的 CarLenght 导入了 组件的 计算属性中！！！
      // 第一种写法
      ...mapGetters(['CarLenght'])

      // 第二种写法
      // 这个 myDefineName 就相当于 CarLenght，就是可以让你取别名的意思..
      //   ...mapGetters({
      //     myDefineName:'CarLenght'
      //   })
    }
  }
</script>

<style scoped>
  .showCart{
    height: 100vh;
  }
  .car-navbar{
    color: #ffffff;
    background: var(--color-high-text);
  }
</style>

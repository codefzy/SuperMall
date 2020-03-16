<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
    export default {
        name: "HomeSwiper",
        components:{
          Swiper,
          SwiperItem
        },
        props:{
          banners:{
            type: Array,
            default(){
              return []
            }
          }
        },
      data(){
          return{
            isLoad:false
          }
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){

            this.$emit('SwiperImageLoad')

            this.isLoad = !this.isLoad
          }
        }
      }
    }
</script>

<style scoped>

</style>

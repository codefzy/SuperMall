<template>
    <div ref="wrapper">
      <div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
      name: "Scroll",
      props:{
        MyProbeType:{
          type:Number,
          default:0
        },
        MypullUpLoad:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return{
          scroll: null
        }
      },
      methods:{
        // time=300  是es6写法，如果不传这个参数，默认 time 为 300
        backTo(x,y,time=300){

          // 这个 betterscroll的 scrollTo 方法 是回到 x y 的位置，time表示要用几毫秒回到 x y的位置
          this.scroll.scrollTo(x,y,time);
        },

        // 重新刷新一下（主要是计算一下课滚动的高度）
        refresh(){

          console.log("1111")
          this.scroll && this.scroll.refresh()
        },

        // 告诉程序 上拉加载已经完成了，可以进行下次上拉加载了，不然的话，只会调用一次！！！
        finishPullUp(){

          this.scroll.finishPullUp()
        }

        // getScrollY(){
        //
        //   console.log(this.scroll.y)
        //   // return this.scroll ? this.scroll.y : 0 ;
        //   return this.scroll.y;
        // }

      },
      mounted(){
        //1.创建betterScroll实体类
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.MyProbeType,
          click: true,
          pullUpLoad: this.MypullUpLoad
        })

        //2.监听滚动
        this.scroll.on("scroll",(position)=>{

         this.$emit('ScrollMove',position)
        })

        // 3.监听上拉加载
        this.scroll.on("pullingUp",()=>{

          console.log("上拉加载！！！");

          this.$emit('pullingUp')


        })

      }
    }
</script>

<style scoped>

</style>

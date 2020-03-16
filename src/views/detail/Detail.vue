<template>
    <div id="detail">
      <detailNavBar class="detail-nav" @DetailNavClick="DetailNavClick" ref="detailNavBar"></detailNavBar>
      <scroll class="content" ref="Myscroll" @ScrollMove="contentScroll" :MyProbeType="3">
        <detailSwiper :topImages="topImages"></detailSwiper>
        <DetailBaseInfo :goods="goods"></DetailBaseInfo>
        <DetailShopInfo :shop="shop"></DetailShopInfo>
        <DetailGoodsInfo :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></DetailGoodsInfo>
        <DetailParamInfo :paramInfo="params" ref="Myparams"></DetailParamInfo>
        <DetailCommentsInfo :commentInfo="commentInfo" ref="Mycomment"></DetailCommentsInfo>
        <GoodsList :goods="recommend" ref="Myrecommend"></GoodsList>
      </scroll>
      <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
      <BackTop @click.native="backClick" v-show="IsShow"></BackTop>
    </div>
</template>

<script>
    import detailNavBar from './childComps/DetailNavBar.vue'
    import detailSwiper from './childComps/DetailSwiper.vue'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
    import DetailShopInfo from './childComps/DetailShopInfo.vue'
    import scroll from 'components/common/scroll/Scroll.vue'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
    import DetailParamInfo from './childComps/DetailParamInfo.vue'
    import DetailCommentsInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList.vue'
    import { debounce } from 'common/utils.js'
    import {itemLisstenerMixIn,BackTopMixin} from 'common/mixin.js'
    import DetailBottomBar from './childComps/DetailBottomBar.vue'
    import {mapActions} from 'vuex'

    export default {
        name: "Detail",
        mixins:[itemLisstenerMixIn,BackTopMixin],
        data(){
          return{
            iid: null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            params:{},
            commentInfo:{},
            recommend:[],
            themeTopY:[],
            getThemeTopY:null
          }
        },
        components:{
            detailNavBar,
            detailSwiper,
            DetailBaseInfo,
            scroll,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentsInfo,
            GoodsList,
            DetailBottomBar
        },
        created(){
            // 1. 保存传入的iid值
            this.iid = this.$route.params.iid;


            getDetail(this.iid).then(res=>{

              // console.log(res)

              // 2. 根据iid请求详情数据
              this.topImages = res.result.itemInfo.topImages;


              // 3. 获取商品信息
              const data = res.result;

              this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);


              // 4. 创建店铺信息的对象

              this.shop = new Shop(data.shopInfo)

              // console.log(this.shop)

              // 5. 保存商品详情数据

              this.detailInfo = data.detailInfo;

              // 6. 获取参数信息

              this.params = new GoodsParam(data.itemParams.info , data.itemParams.rule);

              // 7. 取出评论信息

              if(data.rate.Crate!=0){

                this.commentInfo = data.rate.list[0]

              }
            })


            // 8. 获取推荐信息

            getRecommend().then(res=>{
              // console.log(res.data.list)

              this.recommend = res.data.list
            })

          // $nextTick 是当页面已经渲染好了，会来这里进行回调，但是图片还没有加载好！！！，所以不能在这里获取offsetTop值！！！
          // this.$nextTick(()=>{
          //   this.themeTopY = [];
          //   this.themeTopY.push(0);
          //   this.themeTopY.push(this.$refs.Myparams.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.Mycomment.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.Myrecommend.$el.offsetTop);
          //   console.log(this.themeTopY)
          // })

          // 先用防抖函数包装一下 要处理的代码
          this.getThemeTopY = debounce(()=>{

            this.themeTopY = [];
            this.themeTopY.push(0);
            this.themeTopY.push(this.$refs.Myparams.$el.offsetTop);
            this.themeTopY.push(this.$refs.Mycomment.$el.offsetTop);
            this.themeTopY.push(this.$refs.Myrecommend.$el.offsetTop);
            this.themeTopY.push(Number.MAX_VALUE);
            // console.log(this.themeTopY)

          },300)


        },
        mounted(){

            console.log("我是原来的mounted内容")

        },
        destroyed(){
          this.$bus.$off('itemImageLoad',this.ImgListener)
        },
        methods:{

          ...mapActions(['addCart']),

          detailImageLoad(){

            this.newRefresh();
            // this.$refs.Myscroll.refresh();


            this.getThemeTopY();

          },

          // 监听 点击跳转到一定的对应位置
          DetailNavClick(index){

            this.$refs.Myscroll.backTo(0,-this.themeTopY[index],200)
          },

          contentScroll(position){

            // 注意这里要取个负号！！！让他变为正的..

            const postionY = -position.y;

            const lenght = this.themeTopY.length;

            // console.log(postionY);

            for(let i = 0; i<lenght-1; i++){


              if((this.$refs.detailNavBar.CurrentIndex!==i)&&(this.themeTopY[i]<postionY && postionY<this.themeTopY[i+1])){

                console.log('this i = '+i)
                this.$refs.detailNavBar.CurrentIndex = i;

                console.log(this.$refs.detailNavBar.CurrentIndex)

              }
            }

            this.listenShowBackTop(position);

          },

          addToCart(){

            const product = {};

            product.image = this.topImages[0];

            product.title = this.goods.title;

            product.desc = this.goods.desc;

            product.price = this.goods.newPrice;

            product.realPrice = this.goods.realPrice;

            product.iid = this.iid;

            // 第一种方式
            // this.$store.dispatch('addCart',product).then(res=>{
            //
            //   console.log(res);
            // })

            // 第二种方式
            // 32 行先拿到mapAction, 149 行 放入method方法中，成为method 方法的一部分，然后就可以用了
            // addCart 在Vuex action中的方法，已经可以让组件使用了
            this.addCart(product).then(res=>{

                console.log(res);

                this.$toast.show(res,2000)
              })

          }
        }
    }
</script>

<style scoped>
    #detail{
      position: relative;
      z-index: 9;
      background: #fff;
      height: 100vh;
    }
    .detail-nav{
      position: relative;
      z-index: 9;
      background: #fff;
    }
    .content{
      height: calc(100% - 49px - 58px)
    }
</style>

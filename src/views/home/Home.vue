<template>
	<div id="home">
    <navbar class="home-nav">
        <template v-slot:center>
          <div>购物街</div>
        </template>
    </navbar>

    <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="TabControlTwo" class="secondTabControl" v-show="isTabFixed"></TabControl>

    <scroll class="content" ref="Myscroll" :MyProbeType="3" @ScrollMove="ScrollMove" :MypullUpLoad="true" @pullingUp="loadMore">
      <template>

        <HomeSwiper :banners="banners" @SwiperImageLoad="SwiperImageLoad"></HomeSwiper>
        <HomeRecommend :recommends="recommends"></HomeRecommend>
        <HomeFeature></HomeFeature>
        <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="TabControl"></TabControl>
        <GoodsList :goods="showType"></GoodsList>

      </template>
    </scroll>

    <!-- native 修饰符可以让组件使用原生标签的事件-->
    <BackTop @click.native="backClick" v-show="IsShow"></BackTop>


  </div>
</template>

<script>
  import navbar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import {getHomeMultidata,getHomeGoods} from 'network/home.js'
  import HomeRecommend from './childComps/HomeRecommend.vue'
  import HomeFeature from './childComps/HomeFeature.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import scroll from 'components/common/scroll/Scroll.vue'
  // import BackTop from 'components/content/backTop/BackTop.vue'
  // 导入一下 自己写的防抖函数
  import { debounce } from 'common/utils.js'
  import{BackTopMixin}from 'common/mixin.js'

  export default {
    name:'Home',
    mixins:[BackTopMixin],
    components:{
      navbar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      scroll,
      // BackTop,
      ImgListener:null
    },
    data(){
      return{
          banners:[],
          recommends:[],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}
          },
          currentType:'pop',
          // IsShow:false, 在混入中有
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0
      }
    },
    created(){

      // 1.请求多个数据
      this.getHomeMultidata();

      // 2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted(){

      // 这里配合防抖函数处理  避免频繁调用 BetterScroll的 refresh 函数
      const refresh = debounce( this.$refs.Myscroll.refresh , 500 );


      // 3.监听图片加载完成  在 GoodsListItem.vue 文件中，自己去看看

      this.ImgListener = ()=>{
        // 第二个参数为接收到发送的 itemImageLoad 函数后面要对应处理的函数
        // console.log("处理了itemImageLoad 函数！！！");

        refresh();

      }


      // 注意要给Vue的原型上添加一个$bus才能用，你去看 main.js文件 第 8 行中的添加
      this.$bus.$on('itemImageLoad', this.ImgListener);
    },
    activated(){

      console.log(this.saveY)

      this.$refs.Myscroll.backTo(0,this.saveY,0);

      // 最好刷新一下
      this.$refs.Myscroll.refresh();
    },
    deactivated(){

      this.saveY = this.$refs.Myscroll.scroll.y ;

      console.log(this.saveY)

      // 离开时，销毁对itemImageLoad事件的监听
      this.$bus.$off('itemImageLoad',this.ImgListener)

    },
    methods:{

      SwiperImageLoad(){

        this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop ;

        console.log(this.$refs.TabControl.$el.offsetTop);
      },
      /**
        一般的方法
      */
      tabClick(index){

        switch (index) {
          case 0:
            this.currentType='pop'
                break;
          case 1:
            this.currentType='new'
                break;
          case 2:
            this.currentType='sell'
                break;
        }

        this.$refs.TabControlTwo.currentIndex = index ;
        this.$refs.TabControl.currentIndex = index ;
  },
      // 回到顶部方法，在混入中有!!!  在mixin.js文件中
      /*backClick(){

        this.$refs.Myscroll.backTo(0,0,500)
      },*/
      // 滚轮滚动方法
      ScrollMove(position){

        // console.log(position.y)

        // 1. 判断backtop是是否显示
        // this.IsShow = (-position.y) > 1000
          this.listenShowBackTop(position);  // 用了混入，去看mixin.js文件

        // 2. 决定第二个tabControl 是否显示..
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },

      loadMore(){

         this.getHomeGoods(this.currentType);

         this.$refs.Myscroll.finishPullUp();
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){

        getHomeMultidata().then((res)=>{

          this.banners=res.data.banner.list;

          this.recommends=res.data.recommend.list;

          // console.log(res);
        })
      },
      getHomeGoods(type){

        const page = ++this.goods[type].page;

        getHomeGoods(type,page).then((res)=>{

          // console.log(res.data.list)

          this.goods[type].list.push(...res.data.list)

        })

      }
    },
    computed:{
      showType(){
        return this.goods[this.currentType].list;
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    width: 100%;
  }
  .home-nav{
    background: var(--color-tint);
    color: #ffffff;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .content{
    position: absolute;
    overflow: hidden;

     /*这样可以 让这个部分离顶部44px  底部49px  妙啊~~~*/
    top: 44px;
    bottom: 49px;

  }
  .secondTabControl{
    position: relative;
    z-index: 9;
  }
</style>

import {debounce} from './utils.js'

import BackTop from 'components/content/backTop/BackTop.vue'

// Detail.vue 文件中的 107 行有使用，你自己去看看
export const itemLisstenerMixIn = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.Myscroll.refresh , 100);

    this.itemImgListener = ()=>{

      this.newRefresh();
    }

    this.$bus.$on('itemImageLoad ', this.itemImgListener);

    console.log("我是混入的内容 在mixin.js文件中")
  },
    components:{
      // 这些 components methods 等 也是可以混入的
    },
    methods:{

    }
}


export const BackTopMixin = {
  data(){
    return{
      IsShow:false
    }
  },
  methods:{
    backClick(){

      this.$refs.Myscroll.backTo(0,0,500);
    },
    listenShowBackTop(position){
      this.IsShow = (-position.y) > 1000
    }
  },
  components:{
    BackTop
  }

}

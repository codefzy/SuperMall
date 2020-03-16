import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  addCart(context,payload){

    return new Promise((resolve,reject)=>{
      // item 是数组中每一个元素，  find 函数 如果找到相等就返回，找不到就返回-1
      let old = context.state.cartList.find(item=>item.iid === payload.iid)

      if(old){

        context.commit(ADD_COUNTER,old);

        resolve("添加商品数量+1")

      }else {

        payload.count = 1;

        context.commit(ADD_TO_CART,payload);

        resolve("添加了新的商品")
      }
    })

  }
}

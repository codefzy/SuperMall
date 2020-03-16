import Toast from './Toast.vue'

const obj = {}

// 会自动执行这个对象的 install 方法，方法名不能是其他的名字！！！
obj.install = function (Vue) {

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2.通过 new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  // 3.将组件对象，手动挂载到某一个元素上，这里挂载到 一个 div 上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el 就是你刚才挂载到的 div
  document.body.appendChild(toast.$el)

  // 在Vue原型上添加上 toast,以后要用到的时候就 this.$toast
  Vue.prototype.$toast = toast
}

export default obj

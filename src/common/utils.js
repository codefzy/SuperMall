// 防抖函数，避免多次频繁调用
export function debounce(func,delay=300){

  let timer = null;

  return function (...args) {

    if(timer != null){

      clearTimeout(timer)
    }

    timer = setTimeout(()=>{

      // 这里 和 func() 没什么区别,只是可以传入参数 agrs 而已
      func.apply(this,args)

    },delay)
  }
}

// 日期转化函数
// 其中date是一个Date对象！！！，fmt是转化格式，例如：'yyyy-MM-dd'
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 这个是搭配上面的日期转化函数的...
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

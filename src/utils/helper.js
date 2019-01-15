
const helper = {

  debounce(fn, delay = 500) { // 防抖执行函数
    let handle;
    return function (e) {
      // 取消之前的延时调用
      clearTimeout(handle);
      handle = setTimeout(() => {
        fn(e);
      }, delay);
    }
  }

}

export default helper;

/*
 * 解析url参数
 * @example ?id=13456&a=b
 * @return Object {id:13456,a:b}
 *
 * */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      // substring(start,end)用于提取字符串中介于两个指定下标之间的字符。substring(0)就是从下标为0的位置开始截取字符串
      // split用来把一个字符串在第一个参数的位置分割成字符串数组。
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

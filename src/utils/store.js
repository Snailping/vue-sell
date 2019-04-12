export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;//localStorage一定要指向window下的
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);//把seller解析成一个对象
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};
export function loadFormLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;//返回默认值
  }
  seller = JSON.parse(seller)[id];//解析为json对象并拿到id值
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};

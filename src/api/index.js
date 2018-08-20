import request from '../utils/request'

export default class ApiServer {
  //获取商品基本信息
  static getGoods () {
    let url = `/static/goods.json`
    return request({
      url: url,
      method: 'get',
    })
  }

  //获取评论基本信息
  static getRatings () {
    let url = `/static/ratings.json`
    return request({
      url: url,
      method: 'get',
    })
  }

  //获取商家基本信息
  static getSeller () {
    let url = `/static/seller.json`
    return request({
      url: url,
      method: 'get',
    })
  }
}

import axios from 'axios'

// 使用自定义配置 创建一个 axios 实例
const instance = axios.create({
  baseURL: '/proxy',
  responseType: 'json',
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT', // 避免 IE10 返回 304
    'shouldIntercept': true
  },
  transformResponse(data){
    console.log(data)
    let o = {}
    if(data.list) {
      o.data = data.list;
      o.origin = 'singer'
    }else if(data.banner){
      o.data = data.data;
      o.banner = data.banner
      o.origin = 'new-song'
    }else if(data.rank){
      o.data = data.rank.list;
      o.origin = 'rank'
    }else if(data.plist){
      o.data = data.plist.list.info;
      o.origin = 'plist'
    }else if(data.singers){
      o.data = data.singers.list.info;
      o.origin = 'singers-list'
    }else if(data.songs){
      o.data = data.songs.list;
      o.info = data.info;
      o.origin = 'singers-info'
    }
    return o;
  }
})


export default instance

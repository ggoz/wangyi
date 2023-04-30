import service from "..";

// 首页轮播图数据
export function getBanner() {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}

// 发现好歌单数据
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}

// 搜索歌曲
export function getSearchList(keyWord) {
  return service({
    method: 'GET',
    url: `/search?keywords=${keyWord}`
  })
}

// 生成二维码key
export function getCodeKey() {
  return service({
    method: 'GET',
    url: `/login/qr/key`,
    params: {
      timestamp: new Date().getTime()
    }
  })
}

// 生成二维码
export function getCode(key) {
  return service({
    method: 'GET',
    url: `/login/qr/create`,
    params: {
      key: key,
      timestamp: new Date().getTime(),
      qrimg: true,
    }
  })
}

// 获取二维码状态
export function getCodeStatus(key) {
  return service({
    method: 'GET',
    url: `/login/qr/check`,
    params: {
      key: key,
      timestamp: new Date().getTime(),
    }
  })
}
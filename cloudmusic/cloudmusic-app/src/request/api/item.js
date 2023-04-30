import service from "..";

// 相关歌单推荐
export function getPlaylist(id) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}

// 歌单所有歌曲
export function getSongsList(id) {
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}

// 获取歌曲的歌词
export function getMusicLyric(id) {
  return service({
    method: 'GET',
    url: `/lyric?id=${id}`
  })
}

// 获取歌曲的url
export function getMusicUrl(id) {
  return service({
    method: 'GET',
    url: `/song/url?id=${id}`
  })
}
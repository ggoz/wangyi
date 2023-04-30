import { getCode, getCodeKey, getCodeStatus, getPhoneLogin } from '@/request/api/home';
import { getMusicLyric, getMusicUrl } from '@/request/api/item';
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 歌单列表
    songsList: [{
      al: {
        id: 16932,
        name: "梦游计",
        pic: 109951166118946340,
        picUrl: "https://p2.music.126.net/ifjKrYPuGzRHlbVDNScQfA==/109951166118946328.jpg",
        pic_str: "109951166118946328"
      },
      ar: [{
        "id": 9952,
        "name": "许嵩",
        "tns": [],
        "alias": []
      }],
      id: 167655,
      name: "幻听"
    }],
    // 歌曲歌词
    lrc: {},
    // 歌曲默认索引
    songsListIndex: 0,
    // 暂停图标
    isBtnShow: true,
    // 弹出层控制
    isPopShow: false,
    // 当前播放时间
    currentTime: 0,
    // 歌曲总时长
    duration: 0,
    // 全局底部播放是否展示
    isBottomShow: true,
    // audio src
    audioSrc: ''

  },
  getters: {},
  mutations: {
    // 播放暂停展示
    ChangeBtnShow(state, val) {
      state.isBtnShow = val
    },
    pushSongsList(state, val) {
      state.songsList.push(val)
    },
    // 更新歌曲列表
    UpdateSongsList(state, val) {
      state.songsList = val
    },
    // 更新歌曲列表索引
    UpdateSongsListIndex(state, val) {
      state.songsListIndex = val
    },
    // 更新是否展示弹出层
    UpdatePopShow(state) {
      state.isPopShow = !state.isPopShow
    },
    // 更新歌词
    UpdateLyc(state, val) {
      state.lrc = val
    },
    // 更新当前时间
    UpdateCurrentTime(state, val) {
      state.currentTime = val
    },
    UpdateDuration(state, val) {
      state.duration = val
    },
    UpdateIsLogin(state, val) {
      state.isLogin = val
    },
    UpdateAudioSrc(state, val) {
      state.audioSrc = val
    }
  },
  actions: {
    async getLyricList(context, val) {
      let { data } = await getMusicLyric(val)
      // console.log('dddddd', data);
      context.commit('UpdateLyc', data.lrc)
    },
    async getKey() {
      let { data } = await getCodeKey()
      console.log(data);
      return data
    },
    async getCode(context, val) {
      let { data } = await getCode(val)
      return data
    },
    async getCodeStatus(context, val) {
      let { data } = await getCodeStatus(val)
      // console.log('zzz', data);
      return data
    },
    async getAudioSrc(context, val) {
      let { data } = await getMusicUrl(val)
      console.log(data.data[0].url);
      context.commit('UpdateAudioSrc', data.data[0].url)
    },
  },
  modules: {}
})
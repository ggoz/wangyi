<template>
  <div class="MusicFooter">
    <div class="footerLeft" @click="UpdatePopShow">
      <img :src="songsList[songsListIndex].al.picUrl" alt="">
      <div class="footerContent">
        <span class="title">{{songsList[songsListIndex].name}}</span>
        <span class="tip">横滑切换上下首</span>
      </div>
    </div>

    <div class="footerRight">
      <svg class="icon play" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="playMusic">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon todo" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="audioSrc"></audio>

    <van-popup v-model:show="isPopShow" position="bottom" :style="{ width:'100%', height: '100%' }">
      <MusicDetails :itemList="songsList[songsListIndex]" :playMusic="playMusic" :isBtnShow="isBtnShow" :addDuration="addDuration"></MusicDetails>
    </van-popup>
  </div>
</template>

<script>
import { getMusicUrl } from '@/request/api/item'
import { mapMutations, mapState } from 'vuex'
import MusicDetails from './MusicDetails.vue'
export default {
  data() {
    return {
      timer: null
    }
  },
  components: {
    MusicDetails
  },
  computed: {
    ...mapState([
      'songsList',
      'songsListIndex',
      'isBtnShow',
      'isPopShow',
      'audioSrc'
    ])
  },
  methods: {
    ...mapMutations([
      'ChangeBtnShow',
      'UpdatePopShow',
      'UpdateCurrentTime',
      'UpdateDuration'
    ]),
    playMusic() {
      if (this.isBtnShow) {
        // console.log('31231213', this.$refs.audio)
        this.$refs.audio.play()
        this.ChangeBtnShow(false)
        this.updateTime()
      } else {
        this.$refs.audio.pause()
        this.ChangeBtnShow(true)
        clearInterval(this.timer)
        // console.log(111213123)
      }
    },
    updateTime() {
      this.timer = setInterval(() => {
        this.UpdateCurrentTime(this.$refs.audio.currentTime)
      }, 20)
    },
    addDuration() {
      this.UpdateDuration(this.$refs.audio.duration)
    }
  },
  created() {
    this.$store.dispatch('getAudioSrc', this.songsList[this.songsListIndex].id)
  },
  mounted() {
    console.log([this.$refs.audio])
    this.$store.dispatch('getLyricList', this.songsList[this.songsListIndex].id)
  },
  updated() {
    this.addDuration(this.$refs.audio.duration)
  },
  watch: {
    songsListIndex() {
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.ChangeBtnShow(false)
        this.updateTime()
      }
      this.$store.dispatch(
        'getLyricList',
        this.songsList[this.songsListIndex].id
      )
      this.$store.dispatch(
        'getAudioSrc',
        this.songsList[this.songsListIndex].id
      )
    },
    songsList() {
      this.$refs.audio.autoplay = true
      if (this.isBtnShow) {
        this.ChangeBtnShow(false)
        this.updateTime()
      }
      this.$store.dispatch(
        'getLyricList',
        this.songsList[this.songsListIndex].id
      )
      this.$store.dispatch(
        'getAudioSrc',
        this.songsList[this.songsListIndex].id
      )
    }
  }
}
</script>

<style lang="less" scoped>
.MusicFooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  border-top: 1px solid #e3e3e3;
  .footerLeft {
    width: 75%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 24%;
      height: 73%;
      border-radius: 50%;
    }
    .footerContent {
      margin-left: 0.16rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        width: 200px;
        font-weight: 700;
        /*1. 先强制一行内显示文本*/
        white-space: nowrap; //（ 默认 normal 自动换行）
        /*2. 超出的部分隐藏*/
        overflow: hidden;
        /*3. 文字用省略号替代超出的部分*/
        text-overflow: ellipsis;
      }
      .tip {
        margin-top: 0.04rem;
        font-size: 0.24rem;
        color: #b2b2b2;
      }
    }
  }

  .footerRight {
    width: 18%;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
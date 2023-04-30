<template>
  <img :src="itemList.al.picUrl" alt="" class="bgimg">
  <div class="detailsTop">
    <div class="detailsTopLeft">
      <div class="back" @click="backLevel">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </div>
      <div class="info">
        <span class="songName">
          <Vue3Marquee>
            {{itemList.name}}
          </Vue3Marquee>
        </span>
        <div class="author">
          <span>{{getName(itemList.ar)}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="detailsTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang7"></use>
      </svg>
    </div>
  </div>

  <div class="detailsMiddle" v-show="!isLyricShow">
    <img src="@/assets/needle.png" class="needle_img" :class="{needle_img_active:!isBtnShow}">
    <img src="@/assets/cd.png" class="cd_img">
    <img :src="itemList.al.picUrl" class="al_img" @click="isLyricShow = !isLyricShow" :class="{al_img_active:!isBtnShow, al_img_paused:isBtnShow}">
  </div>

  <div class="musiclyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="(item, index) in musiclyric" :key="item" v-show="item.lyric !== ''" @click="isLyricShow = !isLyricShow" :class="{active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.nextTime)}">
      {{ item.lyric }}
    </p>
  </div>

  <div class=" detailsBottom">
    <div class="bottomTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jushoucang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-changpian1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-54xiaoxi-1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao4"></use>
      </svg>
    </div>
    <!-- 歌词进度条 -->
    <div class="bottomMidlle">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime">
    </div>
    <div class="bottomBase">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caozuo-xunhuan1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon play" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
        <use xlink:href="#icon-bofang9"></use>
      </svg>
      <svg class="icon pause" aria-hidden="true" v-else @click="playMusic">
        <use xlink:href="#icon-zanting11"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'

export default {
  props: ['itemList', 'playMusic', 'isBtnShow', 'addDuration'],
  data() {
    return {
      isLyricShow: false,
      pDisplay: true
    }
  },
  methods: {
    ...mapMutations(['UpdatePopShow', 'UpdateSongsListIndex']),
    getName(item) {
      return item.map((item) => item.name).join(' / ')
    },
    backLevel() {
      this.UpdatePopShow()
      this.isLyricShow = false
    },
    goPlay(val) {
      let index = this.songsListIndex + val
      if (index < 0) {
        index = this.songsList.length - 1
      } else if (index > this.songsList.length - 1) {
        index = 0
      }
      this.UpdateSongsListIndex(index)
    }
  },
  computed: {
    ...mapState([
      'lrc',
      'currentTime',
      'songsListIndex',
      'songsList',
      'duration'
    ]),
    // 歌词处理
    musiclyric() {
      let arr = []
      arr = this.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
        let min = item.slice(1, 3)
        let sec = item.slice(4, 6)
        let msec = item.slice(7, 10)
        let lyric = item.slice(11)
        let time =
          parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
        // console.log(min, sec, isNaN(msec))
        if (isNaN(msec)) {
          msec = item.slice(7, 9)
          lyric = item.slice(10)
          time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
        }
        return {
          min,
          sec,
          msec,
          lyric,
          time
        }
      })
      arr.forEach((item, index) => {
        if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
          item.nextTime = 10000000
        } else {
          item.nextTime = arr[index + 1].time
        }
      })
      console.log(arr)
      return arr
    }
  },
  components: {
    Vue3Marquee
  },
  mounted() {
    console.log('31231312', this.duration)
    this.addDuration()
  },
  updated() {
    this.addDuration()
  },
  watch: {
    currentTime(newVal) {
      let p = document.querySelector('p.active')
      // console.log([p])
      if (p && p.offsetTop > 200) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 210
      }
      if (newVal === this.duration) {
        if (this.songsListIndex === this.songsList.length - 1) {
          this.UpdateSongsListIndex(0)
          this.playMusic()
        } else {
          this.UpdateSongsListIndex(this.songsListIndex + 1)
        }
      }
      // console.log(this.$refs.musicLyric.scrollTop)
    }
  }
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  z-index: -999;
  filter: blur(99px);
  position: absolute;
}
.detailsTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .detailsTopLeft {
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    // margin-top: 0.2rem;
    .back {
      fill: #fafafa;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.5rem;
      // font-size: 0.24rem;
      .songName {
        color: #fafafa;
        width: 3rem;
      }
      .author {
        display: flex;
        align-items: center;
        color: #424242;
        span {
          max-width: 2.6rem;
          white-space: nowrap; //禁止换行
          overflow: hidden;
          text-overflow: ellipsis; //...
        }
        .icon {
          width: 18px;
          height: 18px;
          fill: #424242;
        }
      }
    }
  }
  .detailsTopRight {
    margin-right: 0.2rem;
    fill: #fbfbfb;
  }
}
.detailsMiddle {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 9rem;
  .needle_img {
    z-index: 999;
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-25deg);
    transition: all 2s;
  }
  .needle_img_active {
    z-index: 999;
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .cd_img {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .al_img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_active 20s linear infinite;
  }
  .al_img_active {
    animation-play-state: running;
  }
  .al_img_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_active {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musiclyric {
  position: absolute;
  width: 100%;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.4rem;
  overflow: auto;
  transition: all 1s linear;
  p {
    color: #d7ccd7;
    margin-bottom: 0.4rem;
    text-align: center;
    z-index: 9999;
  }
  .active {
    font-size: 0.5rem;
    color: #f9f9f9;
  }
}
.detailsBottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 165px;
  .bottomTop {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #e8e5e6;
    }
  }
  .bottomMidlle {
    display: flex;
    width: 100%;
    height: 1rem;
    align-items: center;
    .range {
      width: 100%;
      height: 0.06rem;
    }
  }
  .bottomBase {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #e8e5e6;
    }
    .play,
    .pause {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
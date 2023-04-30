<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" class="bgimg">

    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
      <span>歌单</span>
    </div>

    <div class="itemRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon list" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>

  <div class="itemMiddle">
    <div class="cover">
      <img :src="playlist.coverImgUrl" alt="">
      <span class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang4"></use>
        </svg>
        {{getPlayCount(playlist.playCount)}}
      </span>
    </div>
    <div class="info">
      <span class="infoTop">{{playlist.name}}</span>
      <div class="author">
        <img :src="playlist.creator.avatarUrl" alt="">
        <span>{{playlist.creator.nickname}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
      <div class="infoBottom">
        <span>{{playlist.description}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
  </div>

  <div class="itemBottom">
    <div class="every">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-54xiaoxi-1"></use>
      </svg>
      <span>{{playlist.commentCount}}</span>
    </div>

    <div class="every">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang7"></use>
      </svg>
      <span>{{playlist.shareCount}}</span>
    </div>

    <div class="every">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>

    <div class="every">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: ['playlist'],
  setup(props) {
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem('itemDetails')
      ).creator
    }
    let getPlayCount = computed(() => (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      }
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    })
    return {
      getPlayCount
    }
  }
}
</script>

<style lang="less" scoped>
.itemMusicTop {
  display: flex;
  width: 100%;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  .itemLeft,
  .itemRight {
    width: 28%;
    height: 100%;
    display: flex;
    margin: 0 0.2rem;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
    .list {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .bgimg {
    width: 100%;
    height: 12rem;
    position: absolute;
    z-index: -999;
    filter: blur(40px);
  }
}

.itemMiddle {
  display: flex;
  width: 100%;
  padding: 0 0.1rem;
  margin-top: 25px;
  .cover {
    position: relative;
    width: 2.7rem;
    height: 2.8rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .playCount {
      position: absolute;
      display: flex;
      top: 0.1rem;
      right: 0.16rem;
      align-items: center;
      color: #f9f6f4;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        fill: #f9f6f4;
        margin-right: 0.04rem;
      }
    }
  }
  .info {
    display: flex;
    width: 4.3rem;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0.2rem;
    .infoTop {
      color: #f7f6f4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .author {
      display: flex;
      align-items: center;
      color: #bebeba;
      img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.1rem;
        border-radius: 0.3rem;
      }
      .icon {
        margin-top: 0.04rem;
        width: 0.36rem;
        height: 0.36rem;
        fill: #bebeba;
      }
    }
    .infoBottom {
      display: flex;
      align-items: center;
      color: #bebeba;
      font-size: 0.24rem;
      .icon {
        fill: #bebeba;
      }
      span {
        width: 3.9rem;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.itemBottom {
  display: flex;
  justify-content: space-around;
  margin-top: 0.4rem;
  .every {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f7f6f4;
    .icon {
      fill: #f7f6f4;
      color: #f7f6f4;
    }
    span {
      margin-top: 0.1rem;
    }
  }
}
</style>
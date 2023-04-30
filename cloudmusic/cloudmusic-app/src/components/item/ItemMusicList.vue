<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="content">
          <span class="playAll">播放全部</span>
          <span class="total">(共{{songs.length}}首)</span>
        </div>
      </div>

      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jushoucang"></use>
        </svg>
        <span class="star">收藏({{ getStarCount(subscribedCount) }})</span>
      </div>
    </div>

    <div class="musicList">
      <div class="music" v-for="item,index in songs" :key="index">
        <div class="info" @click="playMusic(index)">
          <span class="songId">
            {{index + 1}}
          </span>
          <div class="song">
            <span class="songName">{{item.name}}</span>
            <div class="author">
              <span>{{getName(item.ar)}}</span>
            </div>
          </div>
        </div>
        <div class="options">
          <svg class="icon leftIcon" aria-hidden="true" v-if="item.mv !== 0">
            <use xlink:href="#icon-paishipin"></use>
          </svg>
          <svg class="icon rightIcon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: ['songs', 'subscribedCount'],
  setup(props) {
    const store = useStore()

    let getStarCount = computed(() => (num) => {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    })
    let getName = (item) => {
      return item.map((item) => item.name).join(' / ')
    }
    function playMusic(index) {
      store.commit('UpdateSongsList', props.songs)
      store.commit('UpdateSongsListIndex', index)
    }

    return {
      getStarCount,
      getName,
      playMusic
    }
  }
}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  margin-top: 0.6rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding-top: 0.2rem;
  margin-bottom: 1.5rem;
  .itemListTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      margin-left: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content {
        display: flex;
        align-items: baseline;
        .playAll {
          margin-left: 0.4rem;
          font-weight: 900;
          font-size: 0.36rem;
        }
        .total {
          // display: table-cell;
          vertical-align: bottom;
          font-size: 0.2rem;
          color: #bebcbe;
        }
      }
    }

    .itemRight {
      width: 2.6rem;
      height: 0.8rem;
      margin-top: 0.1rem;
      margin-right: 0.2rem;
      display: flex;
      background-color: #ff1800;
      border-radius: 1rem;
      align-items: center;
      justify-content: center;
      color: #ffe3dd;
      .star {
        margin-left: 0.1rem;
      }
      .icon {
        fill: #ffe3dd;
      }
    }
  }
  .musicList {
    padding: 0 0.2rem;
    width: 100%;
    .music {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.4rem;
      .info {
        display: flex;
        align-items: center;
        width: 80%;
        .songId {
          color: #4e4e51;
          width: 0.34rem;
          text-align: center;
        }
        .song {
          margin-left: 0.2rem;
          display: flex;
          flex-direction: column;
          .songName {
            font-weight: 700;
            max-width: 4.4rem;
            white-space: nowrap;
            overflow: hidden; //文本超出隐藏
            text-overflow: ellipsis; //文本超出省略号替代
          }
          .author {
            display: flex;
            align-items: baseline;
            font-size: 11px;
            color: #bebdb8;
            span {
              max-width: 200px;
              white-space: nowrap;
              overflow: hidden; //文本超出隐藏
              text-overflow: ellipsis; //文本超出省略号替代
            }
          }
        }
      }
      .options {
        display: flex;
        align-items: center;
        fill: #c1c1c1;
        .leftIcon {
          margin-right: 0.4rem;
        }
      }
    }
  }
}
</style>
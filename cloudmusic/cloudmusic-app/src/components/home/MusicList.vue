<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="musicContent">
      <van-swipe :loop="false" :width="150" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in songs.musicList" :key="item">
          <router-link :to="{name:'itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="">
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang4"></use>
              </svg>
              {{getPlayCount(item.playCount)}}
            </span>
            <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { getMusicList } from '@/request/api/home'
export default {
  setup() {
    let songs = reactive({
      musicList: []
    })
    let getPlayCount = computed(() => (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      }
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    })
    onMounted(async () => {
      let { data } = await getMusicList()
      // console.log(data);
      songs.musicList = data.result
      // console.log(songs.musicList);
    })
    return {
      songs,
      getPlayCount
    }
  },
  mounted() {
    // console.log(this.$route);
  }
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    display: flex;
    width: 100%;
    height: 0.6rem;
    justify-content: space-between;
    margin-right: 0.1rem;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.02rem solid #ccc;
      line-height: 0.6rem;
      border-radius: 0.4rem;
      text-align: center;
      padding: 0 0.2rem;
    }
  }
  .musicContent {
    // margin-top: 0.1rem;
    width: 100%;
    height: 4rem;
    .my-swiper {
      width: 100%;
      .van-swipe__track {
        width: 100%;
        .van-swipe-item {
          position: relative;
          width: 100%;
          // margin-right: 0.1rem;
          padding-right: 0.16rem;
          img {
            width: 100%;
            border-radius: 0.2rem;
            margin-bottom: 0.1rem;
          }
          .playCount {
            margin-top: 0.1rem;
            position: absolute;
            top: 0;
            right: 0.3rem;
            display: flex;
            align-items: center;
            color: rgb(247, 242, 242);
            .icon {
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.1rem;
              fill: #fff;
            }
          }
          .name {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            display: -webkit-box;
            -webkit-line-clamp: 2; // 超出多少行
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
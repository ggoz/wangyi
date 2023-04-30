<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
      <input type="text" placeholder="薛之谦" v-model.trim="keyWord" @keydown.enter="addHisList">
      <span @click="addHisList">搜索</span>
    </div>

    <div class="searchHistory">
      <div class="historyTop">
        <span class="searchSpan">搜索历史</span>
        <svg class="icon" aria-hidden="true" @click="clearAll">
          <use xlink:href="#icon-shanchu5"></use>
        </svg>
      </div>
      <div class="history">
        <span v-for="item in historyList" :key="item" @click="historySearch(item)">
          {{item}}
        </span>
      </div>
    </div>

    <div class="musicList">
      <div class="music" v-for="item,index in searchList" :key="index">
        <div class="info" @click="updateIndex(item,index)">
          <span class="songId">
            {{index + 1}}
          </span>
          <div class="song">
            <span class="songName">{{item.name}}</span>
            <div class="author">
              <span>{{getName(item.artists)}}</span>
            </div>
          </div>
        </div>
        <div class="options">
          <svg class="icon leftIcon" aria-hidden="true" v-if="item.mvid !== 0">
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
import { getSearchList } from '@/request/api/home'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      historyList: JSON.parse(sessionStorage.getItem('historyList')) || [],
      keyWord: '',
      searchList: []
    }
  },
  methods: {
    ...mapMutations(['pushSongsList', 'UpdateSongsListIndex']),
    async addHisList() {
      if (this.keyWord !== '') {
        this.historyList.unshift(this.keyWord)
        this.historyList = [...new Set(this.historyList)]
        if (this.historyList.length > 10) {
          this.historyList.splice(this.historyList.length - 1, 1)
        }
        sessionStorage.setItem('historyList', JSON.stringify(this.historyList))
        let { data } = await getSearchList(this.keyWord)
        console.log(data)
        this.searchList = data.result.songs
        console.log(this.searchList)
        this.keyWord = ''
      }
    },
    async historySearch(item) {
      let { data } = await getSearchList(item)
      console.log(data)
      this.searchList = data.result.songs
      console.log(this.searchList)
    },
    clearAll() {
      sessionStorage.removeItem('historyList')
      this.historyList = []
    },
    updateIndex(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      // 可能有小问题 出bug
      item.ar = item.artists
      this.pushSongsList(item)
      this.UpdateSongsListIndex(this.songsList.length - 1)
    },
    getName(item) {
      return item.map((item) => item.name).join(' / ')
    }
  },
  computed: {
    ...mapState(['songsList'])
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.2rem;
    width: 75%;
    color: #b6a9a9;
  }
  span {
    margin-left: 0.2rem;
    font-size: 0.34rem;
  }
}

.searchHistory {
  width: 100%;
  padding: 0.2rem;
  .historyTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchSpan {
      font-size: 0.36rem;
      font-weight: 700;
    }
    .icon {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .history {
    width: 100%;
    margin-top: 10px;
    span {
      display: inline-block;
      border-radius: 0.2rem;
      margin-right: 0.2rem;
      margin-top: 0.2rem;
      background-color: #eceaea;
      padding: 0.1rem;
      // margin-top: 0.4rem;
    }
  }
}
// 搜索歌曲列表
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
</style>
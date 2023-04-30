<template>
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :songs="state.songs" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPlaylist, getSongsList, getSongUrl } from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
  setup() {
    let state = reactive({
      playlist: {},
      songs: {}
    })
    let id = useRoute().query.id

    onMounted(async () => {
      // 获取相关歌单推荐
      let { data } = await getPlaylist(id)
      console.log('getPlaylist', data)
      state.playlist = data.playlist
      sessionStorage.setItem('itemDetails', JSON.stringify(state.playlist))

      // 获取歌单所有歌曲
      let { data: res } = await getSongsList(id)
      console.log('getSongsList', res)
      state.songs = res.songs
      console.log('1', state.songs)
    })
    return {
      state
    }
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  }
}
</script>

<style>
</style>
<template>
  <router-view></router-view>
  <MusicFooter v-show="$store.state.isBottomShow"></MusicFooter>

</template>

<script>
import MusicFooter from '@/components/item/ItemMusicFooter.vue'
export default {
  components: {
    MusicFooter
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
}

a {
  color: black;
}
</style>

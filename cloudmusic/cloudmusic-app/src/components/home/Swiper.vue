<template>
  <div id="topSwiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getBanner } from '@/request/api/home.js'
export default {
  setup() {
    const state = reactive({
      images: []
    })
    onMounted(async () => {
      let { data } = await getBanner()
      state.images = data.banners
    })
    return { state }
  }
}
</script>

<style lang="less" scoped>
#topSwiper {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    :deep(.van-swipe__indicator--active) {
      background-color: rgb(250, 125, 146);
    }
  }
}
</style>
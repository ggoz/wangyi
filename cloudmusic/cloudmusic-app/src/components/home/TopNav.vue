<template>
  <div class="topNav">
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>

    <div class="topNavContent">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div>
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo2"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  .topNavContent {
    display: flex;
    width: 65%;
    height: 100%;
    justify-content: space-around;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
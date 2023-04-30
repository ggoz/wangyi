<template>
  <div class="loginTop">
    <svg class="icon" aria-hidden="true" @click="back">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
    <span>扫码登录</span>
  </div>
  <div class="authCode">
    <div class="code">
      <div class="top">扫码登录</div>
      <img :src="qrimg" alt="">
      <div>请使用网易云APP扫码登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      authCode: '',
      unikey: '',
      qrimg: '',
      timer: null
    }
  },
  methods: {
    async getKey() {
      let { data } = await this.$store.dispatch('getKey')
      console.log(data)
      this.unikey = data.unikey
      console.log('31231', this.unikey)
      this.getCode(this.unikey)
    },
    async getCode(key) {
      let { data } = await this.$store.dispatch('getCode', key)
      console.log(data)
      this.qrimg = data.qrimg
      console.log('31231', this.qrimg)
      this.getCodeStatus(this.unikey)
    },
    getCodeStatus(key) {
      this.timer = setInterval(async () => {
        let res = await this.$store.dispatch('getCodeStatus', key)
        console.log(res)
        if (res.code === 803) {
          clearInterval(this.timer)
          sessionStorage.setItem('cookie', JSON.stringify(res.cookie))
          this.$router.push('/userinfo')
        } else if (res.code === 800) {
          clearInterval(this.timer)
        } else if (res.code === 802) {
          sessionStorage.setItem('user', JSON.stringify(res))
        }
      }, 2000)
    },
    back() {
      clearInterval(this.timer)
      this.$router.back()
    }
  },
  mounted() {
    this.getKey()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.loginTop {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  background-color: rgb(226, 77, 77);
  padding: 0 0.2rem;
  color: white;
  .icon {
    fill: white;
  }
  span {
    margin-left: 2rem;
    font-size: 0.4rem;
  }
}
.authCode {
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .code {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      font-size: 0.5rem;
      font-weight: 500;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
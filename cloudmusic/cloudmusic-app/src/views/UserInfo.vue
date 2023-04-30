<template>
  <div class="returnTop">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
  </div>
  <div class="userTop">
    <img :src="user.avatarUrl" alt="">
    <div class="name">{{user.nickname}}</div>
  </div>

  <ul class="item">
    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhanghao1"></use>
        </svg>
        <span>账号管理</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dingdan"></use>
        </svg>
        <span>我的订单</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode-copy"></use>
        </svg>
        <span>个人中心</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gexingzhuangban"></use>
        </svg>
        <span>个性装扮</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-naozhong"></use>
        </svg>
        <span>音乐闹钟</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kefu"></use>
        </svg>
        <span>我的客服</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>

    <li>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanyu"></use>
        </svg>
        <span>关于</span>
      </div>
      <div>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-ic_arrow_r"></use>
        </svg>
      </div>
    </li>
  </ul>

  <button class="exit" @click="exit">退出登录/关闭</button>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')) || {}
    }
  },
  methods: {
    exit() {
      sessionStorage.removeItem('cookie')
      sessionStorage.removeItem('user')
      this.user = null
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.returnTop {
  padding: 0.2rem;
}
.userTop {
  margin-top: 0.2rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .name {
    margin-top: 0.1rem;
    font-weight: 700;
  }
}
.item {
  margin-top: 0.4rem;
  li {
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    border-top: 1px solid #ccc;
    .itemLeft {
      display: flex;
      align-items: center;
      span {
        margin-left: 0.2rem;
        font-size: 0.34rem;
        // color: #ccc;
      }
    }
    .icon {
      fill: black;
    }
    .rightIcon {
      fill: #ccc;
    }
  }
  li:last-child {
    border-bottom: 1px solid #ccc;
  }
}
.exit {
  display: inline-block;
  width: 100%;
  height: 1rem;
  margin-top: 0.4rem;
  background-color: #faf8f8;
  border: none;
  border-radius: 0.2rem;
  color: rgb(246, 13, 13);
  font-size: 0.34rem;
}
</style>
<template>
  <div class="navbar-top">
    <el-row>
      <el-col :span="4" class="logo-container">
        <span class="topbar-logos">自动部署管理系统</span>
      </el-col>
      <el-col :span="20">
        <el-menu
          :default-active="defaultActiveIndex"
          :router="true"
          :background-color="variables.navBarTopBg"
          :text-color="variables.navBarTopText"
          :active-text-color="variables.navBarTopTextActive"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item
            v-for="item in $router.options.routes"
            v-if="!item.hidden&&item.children"
            :key="item.path"
            :index="item.path" >
            <template slot="title">
              <navitem :meta="item.meta" />
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="user" class-name="user-avatar"/>
          <!-- <i class="el-icon-caret-bottom"/> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
import Navitem from './Navitem'
import variables from '@/styles/variables.scss'

export default {
  components: { Navitem },
  data() {
    return {
      defaultActiveIndex: '/',
      loading: false,
      nickname: ''
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleSelect(index) {
      this.defaultActiveIndex = index
      const routers = this.$router.options.routes // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].path === index) {
          this.$store.commit('CHANGE_NAVMENU', routers[i].children)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.navbar-top {
  height: 50px;
  line-height: 50px;
  // box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  transition: margin-left .18s;
    z-index: 1002;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    .logo-container {
      background-color: $navBarTopBg;
      height: 50px;
      .topbar-logos {
        color: $navBarTopLogo;
        line-height: 50px;
        font-size: 20px;
        position: absolute;
        left: 20px;
      }
    }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0 #e6e6e6;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 10px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 20px;
        height: 20px;
        border-radius: 0px;
        color: $navBarTopText;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>


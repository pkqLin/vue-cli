<template>
  <el-menu :default-openeds="['1', '3']" style="height: 100%;overflow-x: hidden" background-color="rgb(48, 65, 86)"
    text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse" router>
    <!--          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          active-text-color="#ffd04b"-->
    <div style="height: 60px;line-height: 60px;text-align:center; ">
      <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top:5px;">
      <b style="color: white" v-show="textShow">后台管理系统</b>
    </div>


    <div v-for="item in menus" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu :index="item.id + ''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>

    <!-- <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span>主页</span>
      </template>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/role">
        <i class="el-icon-s-custom"></i>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/file">
        <i class="el-icon-document"></i>
        <span>文件管理</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <i class="el-icon-document"></i>
        <span>菜单管理</span>
      </el-menu-item>
    </el-submenu> -->


  </el-menu>
</template>

<script>
export default {
  name: "Asides",
  props: {
    isCollapse: Boolean,
    textShow: Boolean,
    meuns: Array
  },
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
    }
  }
}
</script>

<style>
.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}

.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
}

/*解决收缩菜单文字不消失问题*/
.el-menu--collapse span {
  visibility: hidden;
}
</style>

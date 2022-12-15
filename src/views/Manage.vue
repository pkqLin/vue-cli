<template>
  <div class="home" style="height: 100vh;">
    <el-container style="height: 100%;">
      <el-aside :width="sidewidth + 'px'"
        style="background-color: rgb(238, 241, 246);height: 100%;box-shadow: rgb(0,21,41) 2px 0px 6px;">
        <Asides :isCollapse="isCollapse" :textShow="textShow" />
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px #solid #ccc;">
          <Header :collapse="isCollapse" :collapseBtnClass="collapseBtnClass" />
        </el-header>
        <el-main>
          <!-- <div style="margin-bottom: 30px;">
            <el-breadcrump separator="/">
              <el-breadcrump-item :to="{ path: '/' }">首页</el-breadcrump-item>
              <el-breadcrump-item>用户管理</el-breadcrump-item>
            </el-breadcrump>
          </div> -->


          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  /*background-color: #B3C0D1;*/
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  line-height: 60px;

}

.el-aside {
  color: #333;
}
</style>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import request from "@/utils/request";
import Asides from "@/components/Asides";
import Header from "@/components/Header"
import router from '@/router';
export default {
  name: 'HomeView',
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sidewidth: 200,
      textShow: true,
    }
  },
  created() {
    //请求分页查询数据
    // this.load();
  },
  components: {
    Asides,
    Header,
    router
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sidewidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.textShow = false
      } else {
        this.sidewidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
        this.textShow = true
      }
    }
  },

}
</script>

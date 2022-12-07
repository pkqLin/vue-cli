<template>
  <div class="home" style="height: 100vh;">
    <el-container style="height: 100%;">
      <el-aside :width="sidewidth +'px'" style="background-color: rgb(238, 241, 246);height: 100%;box-shadow: rgb(0,21,41) 2px 0px 6px;">
        <el-menu :default-openeds="['1', '3']" style="height: 100%;overflow-x: hidden"
                 background-color="rgb(48, 65, 86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >
<!--          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          active-text-color="#ffd04b"-->
          <div style="height: 60px;line-height: 60px;text-align:center; ">
            <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top:5px;">
            <b style="color: white" v-show="textShow">后台管理系统</b>
          </div>
          <el-submenu index="1">
            <template slot="title">
             <i class="el-icon-message"></i> <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i> <span>导航二11</span></template>

            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i> <span>导航三1</span></template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px;display: flex;">
          <div style="flex: 1;font-size: 18px;">
              <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse" ></span>
          </div>
          <el-dropdown style="width: 70px;cursor: pointer;">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>





        <el-main>
          <div style="padding: 10px 0;">
            <el-input style="width: 200px;" suffix-icon="el-icon-search"></el-input><el-button style="margin-left: 5px" type="primary">搜索</el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column prop="username" label="用户名" width="100">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="100">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>

            <el-table-column  label="操作" width="200" align="center">
                <el-button type="success" size="mini">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" size="mini">删除<i class="el-icon-remove-outline"></i></el-button>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0;">
            <!--@size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
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

export default {
  name: 'HomeView',
  data(){
    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:2,
      collapseBtnClass:"el-icon-s-fold",
      isCollapse:false,
      sidewidth:200,
      textShow:true
    }
  },
  created() {
    //请求分页查询数据
      this.load();
  },

  methods:{
    collapse(){
      this.isCollapse=!this.isCollapse;
      if(this.isCollapse){
        this.sidewidth=64;
        this.collapseBtnClass="el-icon-s-unfold";
        this.textShow=false
      }else{
        this.sidewidth=200;
        this.collapseBtnClass="el-icon-s-fold";
        this.textShow=true
      }
    },
    load(){
     /* fetch("http://localhost:8091/sysUser/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(res => res.json()).then(res=>{
        this.tableData=res.data;
        this.total=res.total;
      })*/
      request.get("http://localhost:8091/sysUser/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.records;
        this.total= res.total;
        this.pageSize=res.size;
        this.pageNum=res.pages;

      })
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize;
      this.load();
    },
     handleCurrentChange(pageNum){
       this.pageNum=pageNum;
       this.load();
     },
  },

}
</script>

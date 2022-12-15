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
        <el-menu-item index="/">
            <template slot="title">
                <i class="el-icon-house"></i>
                <span>主页</span>
            </template>
            <!-- <i class="el-icon-message"></i> <span>主页</span> -->
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
            </template>

            <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/user">用户管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Asides",
    props: {
        isCollapse: Boolean,
        textShow: Boolean
    }
}
</script>
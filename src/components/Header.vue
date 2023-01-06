<template>
    <div style="font-size: 12px;display: flex;line-height: 60px;display: flex;">
        <div style="flex: 1;font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor: pointer"></span>
            <!-- @click="collapse" -->

            <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px;">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
                <!-- <el-breadcrumb-item :to="item.path" v-for="item in paths">{{ item.name }}</el-breadcrumb-item> -->
            </el-breadcrumb>

        </div>
        <el-dropdown style="width: 70px;cursor: pointer;">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        collapseBtnClass: String,
        textShow: Boolean
    },
    // data() {
    //     return {
    //         paths: [],
    //         pathName: ""
    //     }
    // },
    // created() {
    //     console.log(this.$router);
    // },
    computed: {
        currentPathName() {
            return this.$store.state.currentPathName;
        }
    },
    watch: {
        currentPathName(newVal, oldVal) {
            console.log(newVal)
        }
    }
}
</script>
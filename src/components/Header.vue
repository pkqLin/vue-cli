<template>
    <div style="font-size: 12px;display: flex;line-height: 60px;display: flex;">
        <div style="flex: 1;font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>

            <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px;">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-dropdown style="width: 150px;cursor: pointer; text-align: right">
            <div style="display: inline-block">
               <img :src="user.avatarUrl" alt=""
                        style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
                <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>

            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <router-link to="/person">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration: none" @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>

export default {
    name: "Header",
    props: {
        collapseBtnClass: String,
        textShow: Boolean,
        user: Object
    },
    data() {
        return {
            // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
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
            // console.log(newVal)
        }
    },
    methods: {
        collapse() {
            // this.$parent.$parent.$parent.$parent.collapse()  // 通过4个 $parent 找到父组件，从而调用其折叠方法
            this.$emit("asideCollapse")
        },
        logout() {
            this.$router.push("/login");
            localStorage.removeItem("user");
            this.$message.success("退出成功")
        }
    }
}
</script>

<style scoped>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.router-link-active {
   text-decoration: none;
}
</style>
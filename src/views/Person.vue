<template>
    <el-card style="width:500px">
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: "Person",
    data() {
        return {
            form: {},
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    created() {
        this.getUser().then(res => {
            console.log(res);
            this.form = res;
        })
    },
    methods: {
        async getUser() {
            //获取用户信息
            return (await this.request.get("/sysUser/username/" + this.user.username)).data
        },
        save() {
            this.request.post("/sysUser/update/", this.form).then(res => {
                if (res.code === '200') {
                    this.$message.success("保存成功")
                    // 触发父级更新User的方法
                    this.$emit("refreshUser")
                    // 更新浏览器存储的用户信息
                    this.getUser().then(res => {
                        res.token = JSON.parse(localStorage.getItem("user")).token
                        localStorage.setItem("user", JSON.stringify(res))
                    })
                } else {
                    this.$message.error("保存失败")
                }
            })
        },
    }
}
</script>

<style>

</style>
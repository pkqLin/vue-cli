<template>
    <div>


        <div style="padding: 10px 0;">
            <el-input style="width: 200px;" placeholder="请输入名称" v-model="username"
                suffix-icon="el-icon-search"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
            <el-button style="margin-left: 5px" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="padding: 10px 0;">
            <el-button type="primary" @click="add">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
            <el-upload :action="'http://localhost:8091/sysUser/import'" :show-file-list="false" accept="xlsx"
                :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <!-- <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button> -->
            <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>
        </div>

        <el-table :data="tableData" border stripe @selection-change="handleCheck">
            <el-table-column type="selection" width="55">
            </el-table-column>
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

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="handleEdit(scope.row)">编辑<i
                            class="el-icon-edit"></i></el-button>

                    <el-popconfirm confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                        icon-color="red" title="这是一段内容确定删除吗？" @confirm="handleDel(scope.row.id)">
                        <el-button type="danger" slot="reference" size="mini" @click="">删除<i
                                class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0;">
            <!--@size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-size="pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeUser">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    name: "User",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 5,
            username: "",
            dialogTableVisible: false,
            form: {},

        }
    },

    created() {
        //请求分页查询数据
        this.load();
    },
    // mouted: {
    //     this.load();
    // },
    methods: {
        load() {
            /* fetch("http://localhost:8091/sysUser/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(res => res.json()).then(res=>{
               this.tableData=res.data;
               this.total=res.total;
             })*/
            request.get("/sysUser/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    username: this.username
                }
            }).then(res => {
                debugger
                this.tableData = res.data.records;
                this.total = res.data.total;
                // this.pageSize = res.data.size;
                // this.pageNum = res.data.pages;
            })
        },
        reset() {
            this.username = "";
            this.load();
        },
        saveUser() {
            request.post("/sysUser/insert", this.form).then(res => {
                if (res) {
                    this.$message.success("保存成功！");
                    this.dialogTableVisible = false;
                } else {
                    this.$message.error("保存失败");
                }
            })
        },
        add() {
            this.dialogTableVisible = true;
        },
        closeUser() {
            this.dialogTableVisible = false;
        },
        handleEdit(row) {
            this.dialogTableVisible = true;
            this.form = row;
        },
        handleDel(id) {
            this.request.delete("/sysUser/" + id).then(res => {
                if (res) {
                    this.$message.success("删除成功！");
                    this.dialogTableVisible = false;
                    this.load();
                } else {
                    this.$message.error("删除失败");
                }
            })
        },
        handleCheck(row) {
            this.$alert(row)
            console.log(row);
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum;
            this.load();
        },
        exp() {
            window.open("http://localhost:8091/sysUser/export")
        }
    },
}
</script>
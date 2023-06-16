<template>
    <div>
        <div style="padding: 10px 0;">
            <el-input style="width: 200px;" placeholder="请输入名称" v-model="name" suffix-icon="el-icon-search"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
            <el-button style="margin-left: 5px" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="padding: 10px 0;">
            <el-button type="primary" @click="add">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                icon-color="red" title="您确定批量删除这些数据吗？" @confirm="delBatch">
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
        </div>

        <el-table :data="tableData" border stripe @selection-change="handleCheck">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="100">
            </el-table-column>
            <el-table-column prop="value" label="字典值">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="pid" label="pid">
            </el-table-column>

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="handleEdit(scope.row)">编辑<i
                            class="el-icon-edit"></i></el-button>
                    <el-popconfirm confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info" icon-color="red"
                        title="这是一段内容确定删除吗？" @confirm="handleDel(scope.row.id)">
                        <el-button type="danger" slot="reference" size="mini" @click="">删除<i
                                class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="字典信息" :visible.sync="dialogTableVisible">
            <el-form :model="form" label-width="80px">
                <el-input v-model="form.id" autocomplete="off" type="hidden"></el-input>
                <el-form-item label="字典名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值">
                    <el-input v-model="form.value" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属类型">
                    <el-input v-model="form.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父id">
                    <el-input v-model="form.pid" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDict">取 消</el-button>
                <el-button type="primary" @click="saveDict">确 定</el-button>
            </div>
        </el-dialog>

        <div style="padding: 10px 0;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-size="pageSize" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import { serverIp } from "../../public/config";
export default {
    name: "User",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            name: '',
            dialogTableVisible: false,
            form: {},
            multipleSelection: []
        }
    },
    created() {
        //请求分页查询数据
        this.load();
    },
    methods: {
        load() {
            request.get("/dict/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    username: this.name
                }
            }).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
        add() {
            this.form = {};
            this.dialogTableVisible = true;
        },
        closeDict() {
            this.dialogTableVisible = false;
        },
        saveDict() {
            request.post("/dict/add", this.form).then(res => {
                if (res) {
                    this.$message.success("保存成功！");
                    this.dialogTableVisible = false;
                } else {
                    this.$message.error("保存失败");
                }
            });
            this.load();
        },
        reset() { },
        click() { },
        handleEdit(row) {
            this.dialogTableVisible = true;
            this.form = row;
        },
        handleDel(id) {
            this.request.delete("/dict/" + id).then(res => {
                if (res) {
                    this.$message.success("删除成功！");
                    this.dialogTableVisible = false;
                    this.load();
                } else {
                    this.$message.error("删除失败");
                }
            })
        },
        handleCheck(val) {
            console.log(val)
            this.multipleSelection = val
        },
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
            this.request.post("/dict/del/batch", ids).then(res => {
                if (res.code === '200') {
                    this.$message.success("批量删除成功")
                    this.load()
                } else {
                    this.$message.error("批量删除失败")
                }
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum;
            this.load();
        }
    }

}

</script>

<style scoped></style>
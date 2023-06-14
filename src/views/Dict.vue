<template>
    <div>
        <div style="padding: 10px 0;">
            <el-input style="width: 200px;" placeholder="请输入名称" v-model="name" suffix-icon="el-icon-search"></el-input>
            <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
            <el-button style="margin-left: 5px" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="padding: 10px 0;">
            <el-button type="primary" @click="add">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
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


                </template>
            </el-table-column>
        </el-table>
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
            pageSize: 5,
            name: ''
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

        },
        reset(){},
        click(){},
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
        }
    }

}

</script>

<style scoped></style>
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格数据 -->
            <el-table :data="goodsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="name" width="250px"></el-table-column>
                <el-table-column label="商品价格(元)" prop="price" width="90px"></el-table-column>
                <el-table-column label="商品种类" prop="category_id" width="50px"></el-table-column>
                <el-table-column label="商品详情" prop="info" width="300px"></el-table-column>
                <el-table-column label="商品主人" prop="boss_name" width="100px"></el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeById(scope.row.id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
    import * as PruductsAPI from '../../api/product'

    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                // 商品列表
                goodsList: [],
                // 商品总数
                total: 0
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            // 根据分页获取对应的商品列表
            async getGoodsList() {
                PruductsAPI
                    .listProducts()
                    .then(res => {
                        if (res.status !== 200) {
                            this.notifyError('获取商品列表失败', res.msg)
                        } else {
                            this.goodsList = res.data.item
                            this.total = res.data.total
                        }
                    })
            },
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getGoodsList()
            },
            handleCurrentChange(newSize) {
                this.queryInfo.pagenum = newSize
                this.getGoodsList()
            },
            // 通过Id删除商品
            async removeById(id) {
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该商品, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除！')
                }
                PruductsAPI.DeletePro(id).then(res => {
                    if (res.meta.status !== 200) {
                        this.notifyError('删除商品失败', res.msg)
                        return
                    }
                    this.notifyError('删除商品成功', res.msg)
                    this.getGoodsList()
                })
            },

            goAddPage() {
                this.$router.push('/goods/add')
            }
        }
    }
</script>

<style lang="less" scoped>
</style>

<template>
    <div>
        <el-card>

            <el-page-header icon="" title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 新闻列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">

                <el-table-column prop="title" label="标题" width="180" />

                <el-table-column prop="category" label="分类">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>


                <el-table-column label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleChange(scope.row)" />
                    </template>
                </el-table-column>


                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon="Star" size="small" type="success"
                            @click="handlePreview(scope.row)"></el-button>


                        <el-button circle :icon="Edit" size="small" @click="handleEdit(scope.row)"></el-button>



                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" size="small" type="danger"></el-button>

                            </template>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>



            </el-table>

        </el-card>


        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">

            <div>
                <h1>{{ previewDate.title }}</h1>
                <div style="font-size: 12px; color: gray;">{{ formatTime.getTime(previewDate.editTime) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <div v-html="previewDate.content" class="htmlcontent"></div>
            </div>
        </el-dialog>

    </div>
</template>


<script setup>

import { ref, onMounted, reactive } from "vue"
import axios from "axios";
import formatTime from "@/util/formatTime.js";
import { Star, Edit, Delete,StarFilled } from "@element-plus/icons-vue"
import router from "@/router";

// const  formatTime = formatTime()

const dialogVisible = ref(false) //控制预览新闻是否显示
const userFormRef = ref()

const previewDate = ref({})



const tableData = ref([])
onMounted(() => {
    getTableDate()
})

const getTableDate = async () => {
    const res = await axios.get("/adminapi/news/list")
    // console.log(res.data.data)
    tableData.value = res.data.data
}

//格式化分类
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}

//提交后端更改是否发布
const handleChange = async (item) => {

    // console.log(item)
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })

    await getTableDate()
}

//预览回调函数
const handlePreview = (item) => {
    // console.log(item)
    dialogVisible.value = true
    previewDate.value = item
}

//删除回调函数
const handleDelete = async (item) =>{
    // console.log(item)
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableDate()
}

//编辑事件的回调函数
const handleEdit = (item) =>{
    // console.log(item)
    //跳转到 /news-manage/edinews/:id
    router.push(`/news-manage/newsedit/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}
::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>
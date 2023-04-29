<template>
    <div>
        <el-page-header @back="handleBack()" title="新闻管理"> 
             <!-- icon默认为返回样式，不要icon 需要设置icon为空 -->
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑新闻 </span>
            </template>
        </el-page-header>
      

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm">

            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            
            <el-form-item label="内容" prop="content">

              <editor  @event="handleChange" :content="newsForm.content"  v-if="newsForm.content"/>

            </el-form-item>



            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>


            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @kerwinchange="handleCover"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    更新新闻
                </el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script setup>

import editor from "@/components/editor/Editor.vue"
import {ref,reactive,onMounted} from "vue"
import upload from "@/util/upload"
import Upload from "@/components/upload/Upload.vue"
import {useRouter,useRoute} from "vue-router";
import axios from "axios";

const router = useRouter()
const route = useRoute()
//根据路由带过来的id取数据，然后根据数据预填内容

onMounted(async () =>{
    // console.log(route.params.id) //获取当前页面的路由
    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    // console.log(res.data.data[0])
    Object.assign(newsForm,res.data.data[0])
})

const newsFormRef = ref()
const newsForm = reactive({
    title:"",
    content:"",
    category:1 ,// 1是最新动态  2是典型案例  3是通知公告
    cover:"",
    file:null,
    isPublish:0 // 0表示未发布 1表示已经发布
})



const newsFormRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ]
})

const handleCover = (file) => {
    // console.log(file)
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

//每次内容改变的回调
const handleChange = (data ) =>{
    // console.log(data)
    newsForm.content = data
}

const options = [
    {
        label: "最新动态",
        value: 1
    },
    {
        label: "典型案例 ",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    }
]

const submitForm = () => {
    newsFormRef.value.validate( async (valid) => {
     if(valid){
        // console.log(newsForm)
        await upload("/adminapi/news/list",newsForm)
        router.back()
     }
    })
}

//返回上一级
const handleBack = () =>{
    router.back()
}
</script>


<style lang="scss" scoped>

.el-form{
    margin-top: 50px;
}

</style>
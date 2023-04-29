<template>
    <div>
        <el-page-header @back="handleBack()" title="产品管理"> 
             <!-- icon默认为返回样式，不要icon 需要设置icon为空 -->
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header>
      

        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px" class="demo-ruleForm">

            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>

          
            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction"  type="textarea"/>
            </el-form-item>

            <el-form-item label="产品简要描述" prop="detail">
                <el-input v-model="productForm.detail"  type="textarea"/>
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @kerwinchange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    更新产品
                </el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script setup>


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
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    // console.log(res.data.data[0])
    Object.assign(productForm,res.data.data[0])
})

const productFormRef = ref()
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "", 
    cover: "",
    file: null,
})



const productFormRules = reactive({
    title: [
        { required: true, message: '请输入产品名字', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ]
})




const handleChange = (file) => {
    // console.log(file)
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}






const submitForm = () => {
    productFormRef.value.validate( async (valid) => {
     if(valid){
        // console.log(newsForm)
        await upload("/adminapi/product/list",productForm)
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
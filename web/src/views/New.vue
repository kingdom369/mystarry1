<template>
    <div>
        <el-row>
            <el-col :span="17" :offset="1">
                <div>
                    <h2> {{ currentNews.title }}</h2>
                </div>

                <div class="time">
                    {{ whichTime(currentNews.editTime) }}
                </div>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <div v-html="currentNews.content">
                </div>

            </el-col>
            <el-col :span="4" :offset="2"  >
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: 16px;font-weight: bold;">最近新闻</span>

                        </div>
                    </template>
                    <div v-for="data in topNews" :key="data._id" class="text item" style="padding: 14px;"
                        @click="handeleChangepage(data._id)">
                        <div style="padding: 14px; float: left;">
                            <span>{{ data.title }}</span>
                            <div class="bottom">
                                <time class="tab-time">{{ whichTime(data.editTime) }}</time>

                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import { onMounted, ref , watchEffect,onBeforeUnmount } from "vue"
import axios from 'axios'
import { useRoute,useRouter } from "vue-router"
import moment from 'moment' //改变时间的组件
import { StarFilled } from '@element-plus/icons-vue'

const currentNews = ref({})
const topNews = ref([])
const route = useRoute()
moment.locale("zh-cn");

const stop = watchEffect(async () => {
    // console.log()
    if(!route.params.id) return 
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    console.log(111)
    topNews.value = res2.data.data
    currentNews.value = res1.data.data[0]
})

onBeforeUnmount(() =>{
    console.log(222,"onBeforeUnmount")
    stop()
})

const whichTime = time => {
    return moment(time).format("lll")
}

const router = useRouter()
const handeleChangepage = (id) =>{
    // console.log(id)
    router.push(`/news/${id}`)

}

</script>



<style scoped lang="scss">
.el-row {
    margin-top: 30px;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>
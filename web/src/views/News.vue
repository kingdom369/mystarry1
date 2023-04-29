<template>
    <div class="container">
        <div class="news-herder" :style="{
            backgroundImage: `url(${require('@/assets/newsbg.jpg')})`,
        }">

        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" trigger="click" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>

                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data._id" class="search-item" @click="handeleChangepage(data._id)">
                        {{ data.title }}
                    </div>
                </div>

                <div v-else>
                    <el-empty description="新闻空空如也" :image-size="50" />
                </div>

            </el-popover>
        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">

                    <el-card :body-style="{ padding: '0px' }" shadow="hover"   @click="handeleChangepage(item._id)" >
                        <div class="image" :style="{
                                backgroundImage: `url(http://localhost:3000:${item.cover})`
                            }"></div>
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>

                            </div>
                        </div>
                    </el-card>

                </el-col>


            </el-row>
        </div>

        <el-tabs v-model="whichTab" class="demo-tabs" style="margin-top: 20px;">

            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding: 10px;">

                            <el-card :body-style="{ padding: '0px' }" shadow="hover"  @click="handeleChangepage(data._id)" >
                                <div class="tab-image" :style="{
                                        backgroundImage: `url(http://localhost:3000:${data.cover})`
                                    }"></div>
                                <div style="padding: 14px; float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ whichTime(data.editTime) }}</time>

                                    </div>
                                </div>
                            </el-card>

                        </div>
                    </el-col>

                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="(activity, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(activity.editTime)">
                                {{ activity.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>



        </el-tabs>

        <el-backtop :right="100" :bottom="100" visibility-height="100" />
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import {useRouter} from "vue-router"
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
import moment from 'moment' //改变时间的组件
import _ from "lodash";

moment.locale("zh-cn"); //设置为中文显示
const searchText = ref('')
const visible = ref(false)
const newslist = ref([])

const whichTab = ref(1)



onMounted(async () => {
    const res = await axios.get("/webapi/news/list")
    // console.log(res.data)
    newslist.value = res.data.data
    // console.log(_.groupBy(newslist.value,item => item.category))
    console.log(newslist.value)


})

const searchnewslist = computed(() => searchText.value ? newslist.value.filter(item => item.title.includes(searchText.value)) : [])

const topNewsList = computed(() => newslist.value.slice(0, 4))
// console.log(topNewsList.value)
const whichTime = time => {
    return moment(time).format("lll")
}


const tablist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    },
]

const tabnews = computed(() => _.groupBy(newslist.value, item => item.category))

const router = useRouter()
const handeleChangepage = (id) =>{
    // console.log(id)
    router.push(`/news/${id}`)

}

</script>


<style lang="scss" scoped>
.container {
    position: relative;
}

.news-herder {
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: 0 %20;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;

    &:hover {
        background-color: whitesmoke;
        color: aqua;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>
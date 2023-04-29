<template>
    <div>
        <el-carousel height="calc(100vh - 59px)" direction="vertical" :autoplay="false" v-if="looplist.length">
            <el-carousel-item v-for="item in looplist" :key="item._id">

                <div class="item" :style="{
                        backgroundImage: `url(http://localhost:3000${item.cover})`,
                        backgroundSize: 'cover'
                    }">


                    <el-card class="box-card">

                        <template #header>
                            <div>
                                <h2>{{ item.title }}</h2>
                            </div>
                        </template>

                        <div> {{ item.introduction }} </div>

                        <div class="detail"> {{ item.detail }}</div>

                    </el-card>


                </div>



            </el-carousel-item>
        </el-carousel>

        <el-empty description="暂无产品" v-else />
    </div>
</template>
<script setup>

import { ref, onMounted } from "vue";
import axios from "axios"

const looplist = ref([])
onMounted(async () => {
    const res = await axios.get("/webapi/product/list")
    console.log(res.data.data)
    looplist.value = res.data.data
})

</script>

<style scoped lang="scss">
.item {
    height: 100%;
    width: 100%;
    background-image: cover;
}

.box-card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);

    .detail {
        margin-top: 20px;
    }
}
</style>
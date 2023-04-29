import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import MainBox from "@/views/MainBox.vue"
import RoutersConfig from './config'
import store from '@/store'

const routes = [
  {
    path:"/login",
    name:"login",
    component: Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component: MainBox
  }
  //mainbox 的嵌套路由,根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// RoutersConfig.forEach(item =>{
//   router.addRoute("mainbox",item)
// })


//每次路由跳转之前都会执行beforEach这个回调函数，如果其中没有next（）页面将无法加载内容
router.beforeEach( (to,from,next) =>{
  if(to.name === "login"){
    next()
  }else{
    //判断是不是已授权（已经登录过了），如果授权加载页面，未授权跳转到login页面
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      if(!store.state.isGetterRouter){

          //删除嵌套路由
          //直接删除mainbox
          router.removeRoute("mainbox")

        ConfigRouter()
        next({
           path: to.fullPath //让to重新在路由配置表中走一次
        }) //需要再次放行，才能让页面内容加载
      }else{
        next()
      }

    }
  }
})

const ConfigRouter = () =>{

  if(!router.hasRoute("mainbox")){
    router.addRoute( {
      path:"/mainbox",
      name:"mainbox",
      component: MainBox
    })
  }

  RoutersConfig.forEach(item =>{
    checkPermission(item) && router.addRoute("mainbox",item)
  })

  //改变store中 isGetterRouter = true
  store.commit("changeGetterRouter","true")
}

const checkPermission = (item) =>{
  if(item.requireAdmin){
      return store.state.userInfo.role === 1
  }
  return true
}

export default router

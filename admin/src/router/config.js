
import Center from "@/views/center/Center.vue"
import Home from "@/views/home/Home.vue"
import UserAdd from "@/views/user-manage/UserAdd.vue"
import UserList from "@/views/user-manage/UserList.vue"
import NewsAdd from "@/views/news-manage/NewsAdd.vue"
import NewsList from "@/views/news-manage/NewsList.vue"
import NewsEdit from "@/views/news-manage/NewsEdit.vue"
import ProductAdd from "@/views/product-manage/ProductAdd.vue"
import ProductList from "@/views/product-manage/ProductList.vue"
import ProductEdit from "@/views/product-manage/ProductEdit.vue"
import NotFound from "@/views/notfound/NotFound.vue"

const routers = [
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/user-manage/adduser",
        component: UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-manage/userlist",
        component:UserList,
        requireAdmin:true
    },
    {
        path:"/news-manage/addnews",
        component:NewsAdd
    },
    {
        path:"/news-manage/newslist",
        component:NewsList
    },
    {
        path:"/news-manage/newsedit/:id",  //动态路由
        component:NewsEdit
    },
    {
        path:"/product-manage/addproduct",
        component:ProductAdd
    },
    {
        path:"/product-manage/productlist",
        component:ProductList
    },
    {
        path:"/product-manage/productedit/:id",  //动态路由
        component:ProductEdit
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"notfound",
        component:NotFound
    }
  
]

export default routers
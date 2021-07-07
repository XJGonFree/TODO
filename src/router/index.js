import * as VueRouter from "vue-router";
import Main_v from "../views/main.vue";
import Finish_v from "../views/Finish.vue"
export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: Main_v,
        },
        {
            path: "/Finish",
            name: "finish",
            component: Finish_v,
        }
    ]
})
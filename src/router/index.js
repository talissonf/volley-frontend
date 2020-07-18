import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import RegisterAccount from "@/views/RegisterAccount";
import Recovery from "@/views/Recovery";

Vue.use(Router);

let router = new Router({
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      },
      {
        path: "/register/:nickname?",
        name: "Criar conta",
        component: RegisterAccount
      },
      {
        path: "/recovery",
        name: "Recuperar conta",
        component: Recovery
      },
      {
        path: "*",
        redirect: "/login"
      }
    ],
    mode: "history"
});  

router.beforeEach((to, from, next) => {
    document.title = `CV3D - ${to.name}`
    next()
})

export default router;
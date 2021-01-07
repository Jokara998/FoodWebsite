import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";

Vue.use(Router);

//function authetication(to, from, next) {
//    const token = localStorage.getItem("Authorization");
//  
//    if (!(token === null || token === ""))
//      return next();
//  
//    router.push('/');
//}

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
      
    ],
});

export default router;
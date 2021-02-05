import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Food from "../views/Food"
import Cart from "../views/Cart"
import ClientCoupons from "../views/ClientCoupons"
import ClientOrders from "../views/ClientOrders"
import Comments from "../views/Comments"
import Coupon from "../views/Coupon"
import FoodType from "../views/FoodType"
import Mix from "../views/Mix"
import OrderFood from "../views/OrderFood"
import OrderMix from "../views/OrderMix"
import OrdersDeliverer from "../views/OrdersDeliverer"
import OrdersWorker from "../views/OrdersWorker"
import Clients from "../views/Clients"
import Workers from "../views/Workers"
import RateOrder from "../components/Client/RateOrder"
import jwt_decode from "jwt-decode"
import QrScanner from "../components/Client/QrScanner"

Vue.use(Router);

//function authetication(to, from, next) {
//    const token = localStorage.getItem("Authorization");
//  
//    if (!(token === null || token === ""))
//      return next();
//  
//    router.push('/');
//}

function client(to, from, next) {
    const token = localStorage.getItem("Authorization");
  
    if (!(token === null || token === "") && jwt_decode(token).type == "Client")
      return next();
  
    router.push('/');
}

function worker(to, from, next) {
    const token = localStorage.getItem("Authorization");
  
    if (!(token === null || token === "") && jwt_decode(token).type == "Worker")
      return next();
  
    router.push('/');
}

function deliverer(to, from, next) {
    const token = localStorage.getItem("Authorization");
  
    if (!(token === null || token === "") && jwt_decode(token).type == "Deliverer")
      return next();
  
    router.push('/');
}

function admin(to, from, next) {
    const token = localStorage.getItem("Authorization");
  
    if (!(token === null || token === "") && jwt_decode(token).type == "Admin")
      return next();
  
    router.push('/');
}




const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/food",
            name: "Food",
            component: Food,
            beforeEnter:worker,
        },
        {
            path: "/cart",
            name: "Cart",
            component: Cart
        },
        {
            path: "/clientCoupons",
            name: "ClientCoupons",
            component: ClientCoupons,
            beforeEnter:client,
        },
        {
            path: "/clientOrders",
            name: "ClientOrders",
            component: ClientOrders,
            beforeEnter:client,
        },
        {
            path: "/comments",
            name: "Comments",
            component: Comments,
            beforeEnter:admin,
        },
        {
            path: "/coupon",
            name: "Coupon",
            component: Coupon,
            beforeEnter:admin,
        },
        {
            path: "/foodtype",
            name: "FoodType",
            component: FoodType,
            beforeEnter:worker,

        },
        {
            path: "/mix",
            name: "Mix",
            component: Mix,
            beforeEnter:worker,
        },
        {
            path: "/orderfood",
            name: "OrderFood",
            component: OrderFood,
        },
        {
            path: "/ordermix",
            name: "OrderMix",
            component: OrderMix
        },
        {
            path: "/ordersdeliverer",
            name: "OrdersDeliverer",
            component: OrdersDeliverer,
            beforeEnter:deliverer,
        },
        {
            path: "/ordersworker",
            name: "OrdersWorker",
            component: OrdersWorker,
            beforeEnter:worker,
        },
        {
            path: "/clients",
            name: "Clients",
            component: Clients,
            beforeEnter:admin,
        },
        {
            path: "/workers",
            name: "Workers",
            component: Workers,
            beforeEnter:admin,
        },
        {
            path: "/rateorder",
            name: "RateOrder",
            component: RateOrder,
            beforeEnter:client,
        },
        {
            path: "/qrscanner",
            name: "QrRScanner",
            component: QrScanner,
            beforeEnter:client,
        },
       
    ],
});

export default router;
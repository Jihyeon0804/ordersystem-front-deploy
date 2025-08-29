import OrderListComponent from "@/components/OrderListComponent.vue";
import OrderCart from "@/views/OrderCart.vue";

export const orderRouter = [
    {
        path: "/order/list"
        , name: "OrderListComponent"
        , component: OrderListComponent
    }
    ,
    {
        path: "/order/cart"
        , name: "OrderCart"
        , component: OrderCart
    }
    ,
    
]
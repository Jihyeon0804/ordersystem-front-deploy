import ProductListComponent from "@/components/ProductListComponent.vue";
import ProductCreate from "@/views/ProductCreate.vue";

export const productRouter = [
    {
        path: "/product/list"
        , name: "ProductListComponent"
        , component: ProductListComponent
        , props : {isAdmin : false , pageTitle : "상품 목록"}
    }
    ,
    {
        path: "/product/manage"
        , name: "ProductListManage"
        , component: ProductListComponent
        , props : {isAdmin : true , pageTitle : "상품 관리"}
    }
    ,
    {
        path: "/product/create"
        , name: "ProductCreate"
        , component: ProductCreate
    }
    ,

]
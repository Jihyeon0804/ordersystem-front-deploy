function initState() {
    return {
        // localStorage에 totalQuantity 값이 있으면 해당 값을 가져오고 없으면 0으로 세팅
        totalQuantity : localStorage.getItem("totalQuantity") || 0
        , productsInCart : JSON.parse(localStorage.getItem("productsInCart")) || []
        ,
    }
}


export const cart = {
    state : initState

    , mutations: {
        addCart(state, product) {
            // 장바구니 수량
            state.totalQuantity = parseInt(state.totalQuantity) + product.productCount;
            localStorage.setItem("totalQuantity", state.totalQuantity);

            // 장바구니 안에 상품 목록
            const existProduct = state.productsInCart.find(p => p.productId === product.productId);
            // 이미 있는 상품이면 개수만 더해주기
            if (existProduct) {
                existProduct.productCount += product.productCount;
            } else {
                // 없는 경우 객체 push
                state.productsInCart.push(product);
            }
            localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));
        }
        , clearCart(state) {
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalQuantity");
        }
    }

    , actions: {
        addCart(context, product) {
            context.commit("addCart", product);
        }
        , clearCart(context) {
            context.commit("clearCart");
        }
    }

    // 상태 값을 가져가기 위한 메서드
    , getters: {
        getTotalQuantity: state => state.totalQuantity
        , getProductsInCart: state => state.productsInCart
        , 
    }
}
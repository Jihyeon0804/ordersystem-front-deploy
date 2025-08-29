// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    totalQuantity: parseInt(localStorage.getItem('totalQuantity')) || 0,
    productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || []
  }),
  getters: {
    getTotalQuantity: (state) => state.totalQuantity,
    getProductsInCart: (state) => state.productsInCart
  },
  actions: {
    addCart(product) {
      // 장바구니 수량 업데이트
      this.totalQuantity = parseInt(this.totalQuantity) + product.productCount
      localStorage.setItem('totalQuantity', this.totalQuantity)

      // 장바구니 상품 목록 업데이트
      const existProduct = this.productsInCart.find(p => p.productId === product.productId)
      if (existProduct) {
        existProduct.productCount += product.productCount
      } else {
        this.productsInCart.push(product)
      }
      localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart))
    },

    clearCart() {
      this.productsInCart = []
      this.totalQuantity = 0
      localStorage.removeItem('productsInCart')
      localStorage.removeItem('totalQuantity')
    }
  }
})

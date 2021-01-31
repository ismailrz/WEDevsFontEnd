import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import AddProduct from '@/components/AddProduct'
import UpdateProduct from '@/components/UpdateProduct'

Vue.use(Router)

export default new Router({ 
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/add-product',
      name: 'addProduct',
      component: AddProduct
    },
    {
      path: '/update-product/:id',
      name: 'updateProduct',
      component: UpdateProduct
    },
    {
      path: '*',
      name: 'Product',
      component: Product
    },
  ]
})

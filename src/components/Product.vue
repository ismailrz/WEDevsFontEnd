<template>
  <div >
    <div class="container">
      <div class="row">
          <div class="col-10 mr-0 pr-0">
             <h1 class="bg-primary text-white m-4">WeDevs Product Lists </h1>
          </div>
          <div class="col-2">
            <router-link class="btn btn-sm btn-primary font-weight-bold m-4"  to="/add-product">Add Product</router-link>
          </div>
      </div>
      <div class="row">
          <div v-for="product in products" :key="product.id">
            <div class="card m-2" style="width: 18rem; height: 18rem;">
                <!-- <img class="card-img-top" src="/src/assets/logo.png" alt="Card image cap"> -->
                <img v-if="product.image" class="card-img-top" :src="'http://localhost:8000/storage/images/'+product.image" alt="Card image cap">
                <img v-else class="card-img-top" src="@/assets/cart.png" alt="Card image cap">
                <div class="card-body"  style="width: 15rem; height: 15rem; overflow: hidden;">
                  <h5 class="card-title">{{product.title}}</h5>
                  <p class="card-text">{{product.description}}</p>
                </div>
                <div class="card-footer">
                   <router-link :to="'/update-product/'+product.id" class="btn btn-primary">Update</router-link>
                  <button class="btn btn-danger" @click="delete_product(product.id)">Delete</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Product',
  data () {
    return {
      products: {},
    }
  },
  mounted(){
    this.get_products();
  },
  methods:{
    get_products(){
      // this.$http.get('http://localhost:8000/api/get-products')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
     axios
        .get(
          'http://localhost:8000/api/get-products')
          .then(response => (
            this.products = response.data.products
        ))
        .catch(
          error => console.log(error)
          )
    },
    delete_product(productId) {
      if (confirm("Are yor comfirm to delete?")) {
          axios
          .delete(`http://localhost:8000/api/delete-product/${productId}`)
          .then(res => {
              this.get_products();
          })
          .catch(err => {
              console.log(err);
          });
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

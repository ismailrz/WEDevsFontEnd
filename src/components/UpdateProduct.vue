<template>
  <div >
    <div class="container">
     <div class="row">
          <div class="col-10 mr-0 pr-0">
             <h1 class="bg-primary text-white m-4">Update Product </h1>
          </div>
          <div class="col-2">
            <router-link class="btn btn-sm btn-primary font-weight-bold m-4"  to="/">WeDevs Products</router-link>
          </div>
      </div>
      <div class="row bg-light">
          <form @submit.prevent="update_product">
            <div class="col-12 m-3">
              <div class="form-group">
                <label  class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title" aria-describedby="emailHelp" placeholder="product title" required>
              </div>
            </div>
              
              <div class="col-12  m-3">
                  <div class="form-group">
                    <label  class="form-label">Description</label>
                    <textarea v-model="description" class="form-control" id="" cols="10" rows="5" placeholder=" product details" required></textarea>
                </div>
              </div>
              <div class="col-12  m-3">
                  <div class="form-group">
                  <label  class="form-label">Price</label>
                  <input type="number" v-model="price" class="form-control"  placeholder="product price" required>
                </div>
              </div>
              <div class="col-12  m-3">
                  <div class="form-group">
                      <label for="formFile" class="form-label">Image</label>
                      <input class="form-control" @change="take_image"  type="file" >
                  </div>
                 
              </div>
                <div class="col-12 m-3" v-if="image">
                    <img :src="image" height="300px" width="300px" >
                </div>
              <div class="col-12  m-3">
                <router-link to="/" class="btn btn-secondary">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
          </form>
         
      </div>
    </div>
      
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'UpdateProduct',
 
  data () {
    return {
      editProduct:{},
       title: '',
      description: '',
      price: '',
      image: '',
      productId: null,
    }
  },
  mounted(){
    this.productId = window.location.href.split('/').pop();
    this.get_edit_product();
  },
  methods:{
  get_edit_product(){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
     axios
        .get(
          'http://localhost:8000/api/get-edit-product/'+this.productId)
          .then(response => {
            this.editProduct = response.data.editProduct;
            this.title = this.editProduct.title;
            this.description = this.editProduct.description;
            this.price = this.editProduct.price;
            this.image = this.editProduct.image;
          })
        .catch(
          error => console.log(error)
          )
    },
    take_image(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
          this.image = event.target.result;
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
    },
    update_product(){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
       axios
          .put("http://localhost:8000/api/update-product", {
            productId : this.productId,
            title : this.title,
            description : this.description,
            price : this.price,
            image : this.image,
          })
          .then(res => {
            if(res.data.response == 'success'){ 
                  this.$router.push("/");
              }else{
                 alert(res.data.message)
                               
              }
          })
          .catch(err => { 
                console.log(err);
          });
    },

  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

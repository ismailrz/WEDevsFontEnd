<template>
  <div >
    <div class="container">
      <div class="row">
          <div class="col-10 mr-0 pr-0">
             <h1 class="bg-primary text-white m-4">Add Product </h1>
          </div>
          <div class="col-2">
            <router-link class="btn btn-sm btn-primary font-weight-bold m-4"  to="/">WeDevs Products</router-link>
          </div>
      </div>
      <div class="row bg-light">
          <form @submit.prevent="create_product">
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
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
          </form>
         
      </div>
    </div>
      
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddProduct',
  data () {
    return {
      title: '',
      description: '',
      price: '',
      image: '',
    }
  },
  mounted(){
  //  axios.setHeader('Access-Control-Allow-Origin', '*');
  //  axios.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   axios.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  },
  methods:{
    create_product(){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
       axios
          .post("http://localhost:8000/api/create-product", {
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
    take_image(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
          this.image = event.target.result;
         
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
    },

  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

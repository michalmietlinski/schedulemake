<template>
<div>
    <h2>Dodaj</h2>
    <input type='text' v-model="userName" placeholder="Imię"> <br />
    <input type='text' v-model="lastName" placeholder="Nazwisko"><br />
    <select v-model="userRole">
             <option v-for="role in roles" :value="role" v-bind:key=role> {{role}}</option>
    </select>
    <button v-on:click="addUser"  >Dodaj</button>
    </div>
</template>

<script>
import store from '../store';
export default {
  name: 'userAdd',
  props: {
    msg: String
  },
  computed: {
    roles () {
      return this.$store.state.roles
    }
  },
  data:function() {
return {
    userName: '',
    lastName: '',
    userRole: ''
  };
},
  methods: {
    addUser: function(){
      if(!this.userName||!this.lastName||!this.userRole){
        alert('Dane kurwa')
      }else{
      store.dispatch('addUser', {userName: this.userName, lastName: this.lastName, role: this.userRole});
     this.userName= '';
    this.lastName= ''
    }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ListaUserow{
  width:400px
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

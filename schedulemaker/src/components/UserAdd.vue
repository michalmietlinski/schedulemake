<template>
<div>
    <h2>Dodaj Pracownika</h2>
    <input type='text' v-model="firstName" placeholder="Imię"> <br />
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
    firstName: '',
    lastName: '',
    userRole: ''
  };
},
  methods: {
    addUser: function(){
      if(!this.firstName||!this.lastName||!this.userRole){
        alert('Dane kurwa')
      }else{
      store.dispatch('addUser', {firstName: this.firstName, lastName: this.lastName, role: this.userRole});
     this.firstName= '';
    this.lastName= ''
    }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

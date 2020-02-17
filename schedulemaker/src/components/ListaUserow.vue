<template>
  <div class="ListaUserow">
    <h2>Pracownicy</h2>
    <ul>
    <li v-for="(item) in users" v-bind:key=item.id>
    {{ item.userName }} {{ item.lastName }} {{ item.role }}<button  v-on:click="removeUser(item.id)" >Usuń</button>
    <!-- <input type='date' v-model='usertemp[item.id].blocked'/> -->
  </li>
  </ul>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'ListaUserow',
  data: function() {
return {
    usertemp: {}
  };
},
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods:{
    removeUser: function(id){
      store.dispatch('removeUser', id);
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
a {
  color: #42b983;
}
</style>

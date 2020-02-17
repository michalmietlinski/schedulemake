<template>
  <div class="UserList">
    <h2>Pracownicy</h2>
    <div class="singleUser" v-for="(item) in users" v-bind:key=item.id>
    {{ item.firstName }} {{ item.lastName }} {{ item.role }}<button  v-on:click="removeUser(item.id)" >Usuń</button>
    <!-- <input type='date' v-model='usertemp[item.id].blocked'/> -->
  </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'UserList',
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
.singleUser{
  border-bottom:2px dotted;
  padding:20px 10px;
}

</style>

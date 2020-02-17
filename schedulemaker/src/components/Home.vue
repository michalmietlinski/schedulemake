<template>
<div class=Home>
   <UserAdd />
    <UserList />
    </div>
</template>

<script>
import UserList from './UserList.vue'
import UserAdd from './UserAdd.vue'
export default {
  name: 'Home',
 components: {
    UserList,
    UserAdd,
  },
  data:function() {
return {
    firstName: '',
    lastName: '',
    userRole: ''
  };
},


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

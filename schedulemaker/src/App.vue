<template>
  <div id="app">
    <UserAdd />
    <ListaUserow />
    <SingleUser />
    <WeekView />
  </div>
</template>

<script>
import ListaUserow from './components/ListaUserow.vue'
import UserAdd from './components/UserAdd.vue'
import SingleUser from './components/SingleUser.vue'
import WeekView from './components/WeekView.vue'

export default {
  name: 'App',
  components: {
    ListaUserow,
    UserAdd,
    SingleUser,
    WeekView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

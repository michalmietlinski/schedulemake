<template>
  <div id="app">
   
      <div id="nav">
       
            <router-link to="/">Pracownicy</router-link>
            <router-link to="/SingleUser">Per pracownik</router-link>
            <router-link to="/WeekView">Widok kalendarza</router-link>

            <button v-on:click="save">Zapisz do pamięci przeglądarki</button>
      </div>
     <div class="app-wrapper">
        <transition name="router-anim" enter-active-class="animated bounceInLeft">
          <router-view/>
        </transition>
      </div>
  </div>
</template>

<script>
import store from './store';

export default {
  name: 'App',
    methods:{
    save: function(){
            store.dispatch('save',);
    },
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
#app * {
  box-sizing:border-box;
}
#nav{
  a{
    padding: 5px 10px;
  }
}
</style>

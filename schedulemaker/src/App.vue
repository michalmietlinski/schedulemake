<template>
  <div id="app">
   
      <div id="nav">
       
            <router-link to="/">Pracownicy</router-link>
            <router-link to="/SingleUser">Per pracownik</router-link>
            <router-link to="/WeekView">Widok kalendarza</router-link>
            <router-link to="/Settings">Ustawiania</router-link>
            <button v-on:click="save">Zapisz do pamięci przeglądarki</button>
            <button v-on:click="reset">Reset kalendarza</button>
            <button v-on:click="clear">Wyczyść pamięć</button>
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
            store.dispatch('save');
    },
    reset: function(){
            store.dispatch('reset');
    },
    clear: function(){
            store.dispatch('clear');
            window.location.reload(true);
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

button{
          margin-right:5px;
          border: none;
          padding: 3px 5px;
          background: #57a79f;
          color:#fff;
          &:hover {
            background: #000;
          }
        }

        input[type=checkbox] {
          width: 20px;
          border: none;
        }

        
        input, select{
            width:100px; 
            margin: 0 5px 0 0; height: 20px;
            padding: 0;
        }

        input[type=text], select {
          margin: 5px 5px 5px 0;
        }

</style>

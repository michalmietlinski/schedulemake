<template>
  <div class="Settings">
    <h2>Ustawienia</h2>
    Ile dni do przodu
    <input type="number" v-model="howmanydays" />
    <button v-on:click="saveSettings">Save settings</button>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'Settings',
  data: function() {
return {
  howmanydays: 24
  };
},
  computed: {
    settings () {
      return this.$store.state.settings
    },
  },
  methods:{
   saveSettings: function(){
        store.dispatch('saveSettings', {'howmanydays': this.howmanydays});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Settings{
  width:600px;
  
}

</style>

<template>
  <div class="CalendarView">
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'CalendarView',
  props: {
    uuu: Object,
    Month: String,
  },
  data: function() {
return {
  };
},
  computed: {
        Dates: () =>{

        }
  },
  methods:{
    addBusyDate: function(){
        if(new Date(this.dateBusy)<new Date()||!this.dateBusy){
            alert('Co ty kurwa historię przerabiasz?')
        }else{
            store.dispatch('addBusyDate', [this.selectedUser.id, this.dateBusy]);
            this.dateBusy= '';
        }
    },
    removeBusyDate: function(termin){
        const dt = termin? termin : this.dateBusy
        if(new Date(dt)<new Date()||!dt){
            alert('Co ty kurwa historię przerabiasz?')
        }else{
      store.dispatch('removeBusyDate', [this.selectedUser.id, dt]);
      this.dateBusy= '';
        }
    },
    removeworkDate: function(termin){
      store.dispatch('removeworkDate', [this.selectedUser.id, termin]);
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.CalendarView{
  width:600px;
  select {
      min-width:100px
  }
  .info{
      display: inline-block;
      width:120px;
  }
}

</style>

<template>
  <div class="SingleUser">
    <h2>Pracownik</h2>
    <select v-model="selectedUser" v-if=users.length>0>
             <option v-for="user in users" :value="user" v-bind:key=user.id> {{user.firstName}} {{user.lastName}}</option>
    </select>
    <div v-if=!users.length >
            Brak pracowników do pokazania
        </div>
    <div v-if=selectedUser>

        <span class='info'>Imię:</span> {{selectedUser.firstName }} <br />
        <span class='info'>Nazwisko:</span> {{selectedUser.lastName }} <br />
        <span class='info'>Stanowisko:</span> {{selectedUser.role}} <br />
        <span class='info'>Id:</span> {{selectedUser.id}} <br />
        <div>
            
        <input type="date" v-model="dateBusy" />
        <button v-on:click="addBusyDate()" >Dodaj termin wyłączony</button>
        <button v-on:click="removeBusyDate()" >Usuń termin wyłączony</button>
        </div>
        <div>
           Dni wyłączone:
        <ul>
            <li v-for="date in selectedUser.blockedDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeBusyDate(date)" >Usuń termin wyłączony</button>

                </li>
            </ul>
        </div>
             Dni pracujące:
        <ul>
            <li v-for="date in selectedUser.workDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeworkDate(date)" >Usuń termin pracujący</button>

                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'SingleUser',
  data: function() {
return {
    selectedUser: '',
    dateBusy: ''
  };
},
  computed: {
    users () {
      return this.$store.state.users
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
.SingleUser{
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

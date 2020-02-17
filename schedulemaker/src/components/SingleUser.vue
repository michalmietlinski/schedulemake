<template>
  <div class="SingleUser">
    <h2>Pracownik</h2>
    <select v-model="selectedUser">
             <option v-for="user in users" :value="user" v-bind:key=user.id> {{user.userName}}</option>
    </select>
    <div v-if=selectedUser>

        Imię: {{selectedUser.userName }} <br />
        Nazwisko: {{selectedUser.lastName }} <br />
        Stanowisko: {{selectedUser.role}} <br />
        Id: {{selectedUser.id}} <br />
        <div>
        Busy days:
        <ul>
            <li v-for="date in selectedUser.blockedDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeBusyDate(date)" >Remove Busy date</button>

                </li>
            </ul>
        </div>
             Work days:
        <ul>
            <li v-for="date in selectedUser.workDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeworkDate(date)" >Remove work Date date</button>

                </li>
            </ul>
        <input type="date" v-model="dateBusy" />
        <button v-on:click="addBusyDate()" >Add Busy date</button>
        <button v-on:click="removeBusyDate()" >Remove Busy date</button>
        </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'SingleUser',
  props: {
    msg: String
  },
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
<style scoped>
.SingleUser{
  width:400px
}

</style>

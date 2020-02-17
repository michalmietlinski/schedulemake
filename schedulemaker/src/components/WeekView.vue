<template>
  <div class="weekView">
    <h2>Widok Tygodnia</h2>
    <ul>
    <li v-for="(day, key) in days" v-bind:key=day.name class="weekDay">
       <div class="name"> {{day.name}}</div>
   <div class="modify">
         Modyfikuj potrzebę
         <select v-model="roleperDay[key]">
             <option v-for="role in roles" :value="role" v-bind:key=role> {{role}}</option>
    </select>
    <input type="number" v-model="amountperDay[key]" />
    <button v-on:click="modNeed(key)">How many needed</button>
    </div>
    <div class="assign">
         Dodaj usera
         <select v-model="assignPerDay[key]">
             <option v-for="user in filteredUsers(key)" :value="user" v-bind:key=user.lastName> {{user.lastName}}</option>
    </select>
       <button v-on:click="modAssign(key)">AssignUser</button>
                                  <button v-on:click="assignRandom(key)">Assign Random</button>
    </div>
    <div class="needs">Potrzebni:
    <ul>
    <li v-for="(amount, k) in day.needs" v-bind:key=day+k>
        {{k}}: {{amount}}
        </li>
        </ul>
    </div>
    <div class="assigned">
        Przypisani:
        <ul>
        <li v-for="(person, role) in day.assigned" v-bind:key=day+role>
            {{role}}: 
            <ul>
                <li v-for="(p) in person" v-bind:key=day+p.lastName>
                     {{p.userName}} {{person.lastName}}
                </li>
                </ul>

        </li>
        </ul>
        </div>
    <!-- <input type='date' v-model='usertemp[item.id].blocked'/> -->
  </li>
  </ul>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'weekView',
  props: {
    msg: String
  },
  data: function() {
return {
    roleperDay: {},
    amountperDay:{},
    assignPerDay:{}
  };
},
  computed: {
    days () {
      return this.$store.state.days
    },
    roles () {
      return this.$store.state.roles
    },
    users () {
      return this.$store.state.users
    }
  },
  methods:{
    modNeed: function(day){
        if(!this.roleperDay[day]||!this.amountperDay[day]){
            alert('Wybierz dane')
        }else{
              store.dispatch('setNeeds', {day: day, role: this.roleperDay[day], amount: this.amountperDay[day]});
            this.amountperDay[day]=0
            this.roleperDay[day]=''
            }
    },
    modAssign: function(day){
              store.dispatch('setAssign', {day: day, user: this.assignPerDay[day]});
        },
    assignRandom: function(day){
              store.dispatch('assignRandom', {day: day});
        },
        filteredUsers: function(day){
            return this.users.filter((el)=>!el.blockedDates.includes(day))
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weekView{
  width:100%
}
.weekDay {
    float:left;
    width:100%;
    border-bottom:2px solid;
}
.name {
    float:left;
    width:60%;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.modify{
    width:40%;
    float:right;
}
.needs{
    float:left;
    width:20%;
}
 .assigned{
     float:left;
     width:50%
 }
 .assign{
     float:right;
     width:40%;
 }
</style>

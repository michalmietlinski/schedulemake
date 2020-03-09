<template>
  <div class="weekView">
    <h2>Widok Tygodnia</h2>
    <div v-for="(day, key) in days" v-bind:key=day.name class="weekDay"    v-bind:class="{green: checkFill(day)}">
       <div class="mainInfo">
           <div class="name"> {{day.name}}</div>
             <div class="needs">Potrzebni:
    <ul>
    <li v-for="(amount, k) in day.needs" v-bind:key=day.name+k>
        {{k}}: {{amount}}
        </li>
        </ul>
    </div>
    <div class="assigned">
        Przypisani:
        <ul>
        <li v-for="(person, role) in day.assigned" v-bind:key=day.name+role>
            {{role}}: 
            <ul>
                <li v-for="(p) in person" v-bind:key=day+p.lastName>
                     {{p.firstName}} {{person.lastName}} <button v-on:click="removeAssigned(p, key)"> Remove</button>
                </li>
                </ul>

        </li>
        </ul>
        </div>
           </div>
           <div class="sideAction">
             <input type="checkbox" v-model="needsDay[key]"/> Potrzeba/ Przypisz
          <div class="modify" v-show="needsDay[key]">
            Ile osób potrzeba<br />
         <select v-model="roleperDay[key]">
             <option v-for="role in roles" :value="role" v-bind:key=day.name+role> {{role}}</option>
        </select>
          <input type="number" min=0 v-model="amountperDay[key]" />
          <button v-on:click="modNeed(key)">Dodaj</button>
          </div>
    <div class="assign" v-show="!needsDay[key]">
         Przypisz pracownika <br />
         <select v-model="assignPerDay[key]">
             <option v-for="user in filteredUsers(key)" :value="user" v-bind:key=user.lastName> {{user.lastName}}</option>
    </select>
       <button v-on:click="modAssign(key)">Wybranego</button>
                                  <button v-on:click="assignRandom(key)">Losowo</button>
    </div>
    </div>
  
  </div>
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
    assignPerDay:{},
    needsDay:{},
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
      if(this.assignPerDay[day]){
        store.dispatch('setAssign', {day: day, user: this.assignPerDay[day]});
      }
    },
    removeAssigned: function(user, day){
            store.dispatch('removeAssigned', {day: day, user: user});
    },
    assignRandom: function(day){
              store.dispatch('assignRandom', {day: day});
        },
    filteredUsers: function(day){
     return this.users.filter((el)=>!el.blockedDates.includes(day))
    },
    checkFill: function(day){
      let g= Object.keys(day.needs);
      let r=true;
      g.forEach((g1)=>{
        if(!day.assigned[g1] || day.needs[g1] > day.assigned[g1].length){
          r=false;
        }
      })
      return r
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weekView{
  width:100%
}
.weekDay.green{
  background: #ceffdf;
}
.weekDay {
    float:left;
    width:100%;
    border-bottom:2px solid;
    padding:10px;
}

h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
 .mainInfo{
    width:60%;
    float: left;
    .name {
        float:left;
        width:100%;
    }
    .needs {
        float:left;
        width: 20%;
    }
    .assigned{
        float:left;
        width:80%;
    }
    ul, li{
        padding:3px;
    list-style-type:none
    }
 }
 .sideAction{
     width:40%;
         float: left;
         .modify, .assign{
            width:100%;
            padding: 5px 0;
        }
        input, select{
            width:100px; margin: 5px; height: 20px;
                padding: 0;

        }
 }
</style>

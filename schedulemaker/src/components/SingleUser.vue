<template>
  <div class="SingleUser">
    <h2>Pracownik</h2>
    <div class="selectUser">
    <select v-model="selectedUser" v-if=users.length>0>
             <option v-for="user in users" :value="user" v-bind:key=user.id> {{user.firstName}} {{user.lastName}}</option>
    </select>
    </div>

    <div v-if=!users.length >
            Brak pracowników do pokazania
        </div>
    <div class="userList">
      <div  v-for="user in users" :value="user" v-bind:key=user.id>
        {{user.firstName}} - {{user.lastName}} <button v-on:click="selectedUser=user"> Wybierz</button>
      </div>
    </div>
    <div v-if=selectedUser class="selectedUser">

        <span class='info'>Imię:</span> {{selectedUser.firstName }} <br />
        <span class='info'>Nazwisko:</span> {{selectedUser.lastName }} <br />
        <span class='info'>Stanowisko:</span> {{selectedUser.role}} <br />
        <span class='info'>Id:</span> {{selectedUser.id}} <br />
        <div>
        <div class="singleDate">
          <input type="date" v-model="dateBusy" />
          <button v-on:click="addBusyDate()" >Dodaj termin wyłączony</button> <button v-on:click="removeBusyDate()" >Usuń termin wyłączony</button>

        </div>
        <div class="multiDate">
          <input type="date" v-model="dateBusyStart" placeholder="From" />
          <input type="date" v-model="dateBusyEnd" placeholder="To"  />
          <button v-on:click="addBusyDates()" >Dodaj terminy wyłączony</button>

        </div>
        
        </div>
        <div class="workdates">
           Dni wyłączone:
        <ul>
            <li v-for="date in selectedUser.blockedDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeBusyDate(date)" >Usuń termin wyłączony</button>

                </li>
            </ul>
        </div>
        <div class="workdates">

             Dni pracujące:
        <ul>
            <li v-for="date in selectedUser.workDates" v-bind:key=date>
                {{date}}         <button v-on:click="removeworkDate(date)" >Usuń termin pracujący</button>

                </li>
        </ul>
        </div>
        <Calendar v-bind:uuu="selectedUser" Month="2" />

        </div>
         
  </div>
 
</template>

<script>
import store from '../store';
import Calendar from './CalendarView.vue';

export default {
  name: 'SingleUser',
   components: {
    Calendar,
  },
  data: function() {
return {
    selectedUser: '',
    dateBusy: '',
    dateBusyEnd:'',
    dateBusyStart: ''
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
    addBusyDates: function(){
        console.log(this.dateBusyStart, this.dateBusyEnd)
      if(new Date(this.dateBusyStart)<new Date()||!this.dateBusyStart||new Date(this.dateBusyStart)>new Date(this.dateBusyEnd)){
            alert('Co ty kurwa historię przerabiasz?')
        }else{
          const days= (new Date(this.dateBusyEnd)-new Date(this.dateBusyStart))/1000/3600/24;
          for(let i=0;i<days;i++){
            const d=new Date(new Date([this.dateBusyStart.split('-')]).getTime()+i*24*3600000);
            const dformatted=`${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
            store.dispatch('addBusyDate', [this.selectedUser.id, dformatted ]);
          }
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
  width:100%;
  select {
      min-width:100px
  }
  .info{
      display: inline-block;
      width:120px;
      margin-bottom: 10px;
    font-weight: 700;
  }
  .userList{
    width:20%;
    float:left;
    min-width:200px;
  }
  .selectedUser{
    width:80%;
    float:left;
    min-width:200px;
  }
  .selectUser{
    width:100%;
    float:left;
  }
  .singleDate{
    input{
      width:150px;
    }
  }
  .multiDate{
    padding:10px 0;
    input{
      width:150px;
    }
  }
  .workdates{
    max-width:400px;
    li{
      float:left;
      width:100%;
    }
    button{
      float:right;
    }
  }
  .userList{
    padding-right:20px;
    &>div{
      width:100%;
      padding:0 0 10px 0;
      float:left;
      button{
        float:right;
      }
    }
  }
}

</style>

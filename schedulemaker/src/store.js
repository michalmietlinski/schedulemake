import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
//  days:{
//   p: {name: 'Poniedziałek', needs: {}, assigned:{}},
//   w: {name: 'Wtorek',needs: {}, assigned:{}},
//   sr: {name: 'Środa',needs: {}, assigned:{}},
//   c: {name: 'Czwartek',needs: {}, assigned:{}},
//   pt: {name: 'Piątek',needs: {}, assigned:{}},
//   s: {name: 'Sobota',needs: {}, assigned:{}},
//   n: {name: 'Niedziela',needs: {}, assigned:{}},
//  }

let days={}
let t=new Date();
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};
for(let i=0;i<24;i++){
  let r=new Date;
  r.setDate(new Date(t).getDate()+i)
  days[r.yyyymmdd()]= {name: r.yyyymmdd(),needs: {}, assigned:{}}
}

export default new Vuex.Store({
  state: {
    users:[],
    roles:['Barman', 'Kelner'],
    days
  },
  
  getters: {
  },
  
  mutations: {
    addUser(state, user) {
      if(state.users.length>0){
        user.id=state.users[state.users.length-1].id+1
      }else{
        user.id=1;
      }
      user.blockedDates=[];
      user.workDates=[];
      state.users.push(user)
    },
    removeUser(state, useuderIDr) {
      let t;
      //Filter users
      state.users=state.users.filter((el)=>{
        if(el.id==useuderIDr){
            t=el
        }
        return el.id!==useuderIDr})
      //Filter from assignments
      for (const [key, value] of Object.entries(state.days)) {
          if(value.assigned[t.role]&&value.assigned[t.role].includes(t)){
            days[key].assigned[t.role]=days[key].assigned[t.role].filter((el)=>el!==t)
          }
      }
    },
    addBusyDate(state, date) {
      state.users=state.users.map((el)=>{
        if(el.id===date[0]&&!el.blockedDates.includes(date[1])){
          el.blockedDates.push(date[1])
        }
        return el
      })
    },
    removeBusyDate(state, date) {
      state.users=state.users.map((el)=>{
        if(el.id===date[0]){
          el.blockedDates=el.blockedDates.filter(el=>el!=date[1])
        }
        return el
      })
    },
    setNeeds(state, data) {
      state.days[data.day].needs[data.role]=data.amount
    },
    setAssign(state, data) {
      if(!state.days[data.day].assigned[data.user.role]){
        state.days[data.day].assigned[data.user.role]=[]
      }
      if(!state.days[data.day].assigned[data.user.role].includes(data.user)){
      state.users=state.users.map((el)=>{
        if(el.id===data.user.id&&!el.workDates.includes(data.day)&&!el.blockedDates.includes(data.day)){
          el.workDates.push(data.day)
          state.days[data.day].assigned[data.user.role].push(data.user)
        }
        return el
      })
    }
    },
    assignRandom(state, data) {
      for (const [key, value] of Object.entries(state.days[data.day].needs)) {
        let t=state.users.filter((el)=>el.role==key&&!el.blockedDates.includes(data.day));
        if(t.length<value){
          alert('Za mało ludzi!')
          return
        }
        state.days[data.day].assigned[key]=[]
        let r=value;
        while(r!=0){
          let g=Math.floor((Math.random() * 10));
          if(t[g]&&!state.days[data.day].assigned[key].includes(t[g])){
            r--
              state.users=state.users.map((el)=>{
                if(el.id===t[g].id&&!el.workDates.includes(data.day)){
                  el.workDates.push(data.day)
                }
                return el
              })
              state.days[data.day].assigned[key].push(t[g])
          }
        }
      }
    },
    removeworkDate(state, date) {
      let r='';
      state.users=state.users.map((el)=>{
        if(el.id===date[0]){
          r=el
          el.workDates=el.workDates.filter(el=>el!=date[1])
        }
        return el
      })
      state.days[date[1]].assigned[r.role]=state.days[date[1]].assigned[r.role].filter(el=>el!=r)

    },
    

  },
  
  actions: {
    addUser({ commit }, user){
      commit('addUser', user)
    },
    removeUser({ commit }, uderID){
      commit('removeUser', uderID)
    },
    addBusyDate({ commit }, date ){
      commit('addBusyDate', date)
    },
    removeBusyDate({ commit }, date ){
      commit('removeBusyDate', date)
    },
    setNeeds({ commit }, date ){
      commit('setNeeds', date)
    },
    setAssign({ commit }, date ){
      commit('setAssign', date)
    },
    assignRandom({ commit }, date ){
      commit('assignRandom', date)
    },
    removeworkDate({ commit }, date ){
      commit('removeworkDate', date)
    },
    
    // Here we will create Larry
  }
});
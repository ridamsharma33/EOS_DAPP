<template>
  <span>
    <v-toolbar app color="black darken-4" dark>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>{{appTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <h1 v-if="$store.state.loggedIn">{{balance}}</h1>
      <v-spacer></v-spacer>
      <h2 v-if="$store.state.loggedIn">{{name}}</h2>
      
      <div v-if="$store.state.loggedOut"><v-btn @click="handleLogin()" primary large block >Login</v-btn></div>
      <v-btn @click="handleLogout()" v-if="$store.state.loggedIn">Logout</v-btn>
    </v-toolbar>
  </span>
</template>

<script>
import EosService from '@/eosio/EosService';
import { async } from 'q';


export default {
  name: 'AppTopBar',
  
  data() {
    return {
      appTitle: 'My EOS Dapp',
       accountName: '',
      privateKey: '',
      eosio: null,
      balance: '',
      name: ''
    };
  },
  methods: {
    handleLogout: async function() {
     
    //this.scatter.forgetIdentity(); 
   
    
     this.$store.commit('logoutStatus', true);
      this.$router.push('/');
    
    
    },

      handleLogin: async function() {
      if (this.eosio === null) {
        this.eosio = new EosService(
          process.env.VUE_APP_DAPP_NAME,
          process.env.VUE_APP_SMART_CONTRACT_NAME
        );
      }

      if (!(await this.eosio.connect()))
        return console.log('Failed to get Scatter account');

      if (
        await this.eosio.transaction('login', { user: this.eosio.account.name })
      ) {
        this.$store.commit('loginStatus', true);

        //this.$router.push('home');
        //console.log(await this.eosio.getUserAmount());


        this.name = this.eosio.account.name;
        const userAmount = await this.eosio.getUserAmount();
         this.balance = userAmount.core_liquid_balance;
        

       
        


        //amount = getUserInfo();
        //const trx = await this.eosio.getBlock()
        console.log( this.eosio.account.name ); 
        console.log( await this.eosio.getUserAmount() );
        console.log( this.balance );
        console.log( account_info );
      }
    }
    
     
  }
  
};
</script>

<style scoped>
</style>

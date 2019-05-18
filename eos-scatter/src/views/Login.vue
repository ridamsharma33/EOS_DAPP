<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="200" width="500"><v-spacer></v-spacer>
       
          <input v-model="message" placeholder="Number of tokens to purchase" v-if="$store.state.loggedIn" ><v-spacer></v-spacer>
          <v-btn primary @click="handlePayment" v-if="$store.state.loggedIn" >BUY</v-btn><v-spacer></v-spacer>
          <input v-model="message" placeholder="Number of tokens to sell" v-if="$store.state.loggedIn" ><v-spacer></v-spacer>
          <v-btn primary v-if="$store.state.loggedIn" >SELL</v-btn>

          <h1 v-if="$store.state.loggedIn">Balance : {{balance}}</h1> 
        </v-card>
      </v-flex>
     
    </v-layout>
  </v-container>
</template>

<script>
import EosService from '@/eosio/EosService';
import { async } from 'q';

export default {
  data() {
    return {
      accountName: '',
      privateKey: '',
      eosio: null,
      balance: 0,
      name: ''
    };
  },
  methods: {
     
     handlePayment: async function() {
      if (this.eosio === null) {
        this.eosio = new EosService(
          process.env.VUE_APP_DAPP_NAME,
          process.env.VUE_APP_SMART_CONTRACT_NAME
        );
      }

      if (!(await this.eosio.connect()))
        return console.log('Failed to get Scatter account');

      if (
        await this.eosio.payment()
      ) {
        //this.$store.commit('loginStatus', true);
        //this.$router.push('home');
        this.name = this.eosio.account.name;
        const userAmount = await this.eosio.getUserAmount();
         this.balance = userAmount.core_liquid_balance;
        console.log( this.eosio.account.name );
      }


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
        console.log( this.balance );
        console.log( account_info );
      }
    }
  }


};
</script>

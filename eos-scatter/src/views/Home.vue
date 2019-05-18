<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Home</h4>
            </v-card-title>
            <div>
              <h1>{{balance}}</h1>
            </div>
            <v-form>
              <v-card-actions>
                <v-btn @click="handlePayment()" primary large block>Payment</v-btn>
                <v-btn @click="handleProfile()" primary large block>Profile</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EosService from '@/eosio/EosService';

export default {
  
  
  data() {
    return {
      accountName: '',
      privateKey: '',
      eosio: null,
      balance: 0,
    };
  },
  
  methods: {
     
     getUserBalance: async function() {

      console.log( account )
      const amount = getUserAmount();
       amount.then( val => {
            
            balance: 1
        }).catch( (exception) => {console.log(exception)} );
    },
     
     
     
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
        this.$store.commit('loginStatus', true);
        this.$router.push('home');
        this.getUserAmount();
        console.log( this.eosio.account.name );
      }


    },

    handleProfile: async function() {
      if (this.eosio === null) {
        this.eosio = new EosService(
          process.env.VUE_APP_DAPP_NAME,
          process.env.VUE_APP_SMART_CONTRACT_NAME
        );
      }

      if (!(await this.eosio.getAccountName()))
        return console.log('Failure!!!');

      //const account_info = await this.eosio.getAccountName();
      console.log(await this.eosio.getAccountName())
      

      var myObject = new Vue({
        el: '#app',
        data: {message: 'Hello Vue!'}
      })

    }
  }


};

</script>

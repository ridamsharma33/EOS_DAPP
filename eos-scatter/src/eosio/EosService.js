//EosService.js
import { Api, JsonRpc } from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import { async } from 'q';
const endpoint = 'https://jungle2.cryptolions.io:443'; // jungle
const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'jungle2.cryptolions.io',
  port: 443,
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
};
class EosService {
  constructor(dappName, contractAccount) {
    this.dappName = dappName;
    this.contractAccount = contractAccount;
    ScatterJS.plugins(new ScatterEOS());
    this.rpc = new JsonRpc(endpoint);
    window.ScatterJS = null;
    
  }
  
  
  //connect

connect = async () => {
    await ScatterJS.scatter.connect(this.dappName).then(connected => {
      if (!connected) return console.log('Failed to connect with Scatter!');
      this.scatter = ScatterJS.scatter;
    });
    await this.scatter.forgetIdentity()
await this.scatter.getIdentity({ accounts: [network] }).then(() => {
      this.account = this.scatter.identity.accounts.find(
        e => e.blockchain === 'eos'
      );
    });  
if (this.account === null) return false;

return true;

  }

//get block 

getBlock = async () => {

	try {
		const expireInSeconds = 60 * 60; // 1 hour
		const info = await this.rpc.get_info();
		const chainDate = new Date(info.head_block_time + 'Z');
		let expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);
		expiration = expiration.toISOString().split('.')[0];
		const block = await this.rpc.get_block(info.last_irreversible_block_num);
		
		return block;
	} catch (  exception  ) {
		console.log(  exception  );
	}
};



/*
connect = async () => {

  try {		
		ScatterJS.plugins(new ScatterEOS());
		const scatterInfo = await ScatterJS.scatter.connect(this.dappName);

		if ( scatterInfo ) 
		{
			const scatter = ScatterJS.scatter;
			const requiredFields = { accounts:[network] };
			const scatterVal = await scatter.getIdentity(requiredFields);
			window.ScatterJS = null;

			if ( !isNull( scatterVal.accounts[0].name ) ) {
				sessionStorage.setItem( 'isLogged', scatterVal.accounts[0].name );
			}

			return scatterVal;
		} else {
			return false;			
		}
	} catch (  exception  ) {
		console.log(exception)
		if ( exception.type === "identity_rejected" ) return 2;
	}

}

*/


  //Get account name

  getAccountName = async () => {

    ScatterJS.plugins(new ScatterEOS());

    try {
	
      const scatterInfo = await ScatterJS.scatter.connect(this.dappName);
      if ( scatterInfo ) {
  
        const scatter = ScatterJS.scatter;
        const requiredFields = { personal:['firstname', 'lastname'], location:['country'] };
        const scatterVal = await scatter.getIdentity(requiredFields);
  
        return scatterVal;
      } 
      return scatterInfo;
    } catch ( exception ) {
      console.log( exception )
    }
  };
  

  //get Balance

  getUserAmount = async () => {

    const res = await this.rpc.get_account( this.account.name );
	return res;

  };
  
  /*payment
  
    payment = async () => {
      
      this.api = this.scatter.eos(network, Api, { rpc: this.rpc });
      ScatterJS.plugins(new ScatterEOS());
	
	try {
   
		const scatterInfo = await ScatterJS.scatter.connect(this.dappName);
		if ( scatterInfo ) {

			const scatter = ScatterJS.scatter;
			const requiredFields = { accounts:[network] };
			const scatterVal = await scatter.getIdentity();
			
			if ( scatterVal ) {
				const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

				const result = await this.api.transact({
					actions: [{
					  account: 'eosio.token',
					  name: 'transfer',
					  authorization: [{
						actor: account.name,
						permission: 'active',
					  }],
					  data: {
						from: account.name,
						to: 'firstwallet1',
						quantity: 1,
						memo: 'Pay Check'
					  },
					}]
				}, {
					blocksBehind: 3,
					expireSeconds: 30,
				});

				return result;
			}

		} return false;

	} catch ( exception ) {
		console.log( exception )
	}

  };

*/

payment = async () => {

  this.api = this.scatter.eos(network, Api, { rpc: this.rpc });
  const resultWithConfig = await this.api.transact(
        {
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [
                {
                  actor: this.account.name,
                  permission: this.account.authority
                }
              ],
              data: {
                from: this.account.name,
                to: 'firstwallet1',
                quantity: '10.0000 EOS',
                memo: 'Pay Check'
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      console.log(resultWithConfig);
      return true;
    };
    
  
  
  
  

  

transaction = async (action, data) => {
    this.api = this.scatter.eos(network, Api, { rpc: this.rpc });
const resultWithConfig = await this.api.transact(
      {
        actions: [
          {
            account: this.contractAccount,
            name: action,
            authorization: [
              {
                actor: this.account.name,
                permission: this.account.authority
              }
            ],
            data: {
              ...data
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
    console.log(resultWithConfig);
    return true;
  };
  




}

export default EosService;
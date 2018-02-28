/* 
 * Note: this file was generated by a script. Manual changes may be overwritten !
 * 
 * Contains the ABI definition needed to interact with the contract and other metadata generated by the truffle framework.
 */
/* eslint-disable */
const contract = {
  "contract_name": "P4PGame",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "active",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "pool",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "board",
          "type": "bytes32"
        }
      ],
      "name": "addGame",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "lockTokenController",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_pool",
          "type": "address"
        }
      ],
      "name": "setPoolContract",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "receivers",
          "type": "address[]"
        },
        {
          "name": "amounts",
          "type": "uint16[]"
        }
      ],
      "name": "distributeTokens",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_controller",
          "type": "address"
        }
      ],
      "name": "setTokenController",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "shutdown",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "name": "_poolAddr",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "hash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "boardEndState",
          "type": "bytes32"
        }
      ],
      "name": "GamePlayed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "GameOver",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x60606040526002805460a060020a60ff02191674010000000000000000000000000000000000000000179055341561003657600080fd5b60405160408061078d83398101604052808051919060200180519150505b60008054600160a060020a03338116600160a060020a0319928316179092556002805485841690831617905560018054928416929091169190911790555b50505b6106e9806100a46000396000f300606060405236156100885763ffffffff60e060020a60003504166302fb0c5e811461008d57806310fe9ae8146100b457806316f0115b146100e357806331b97e45146101125780634cc9f4e11461012d57806359c3f3e0146101425780638da5cb5b1461016357806397c8f31114610192578063e102baab14610223578063fc0e74d114610244575b600080fd5b341561009857600080fd5b6100a0610259565b604051901515815260200160405180910390f35b34156100bf57600080fd5b6100c761027a565b604051600160a060020a03909116815260200160405180910390f35b34156100ee57600080fd5b6100c761028a565b604051600160a060020a03909116815260200160405180910390f35b341561011d57600080fd5b61012b600435602435610299565b005b341561013857600080fd5b61012b61031e565b005b341561014d57600080fd5b61012b600160a060020a0360043516610390565b005b341561016e57600080fd5b6100c76103d8565b604051600160a060020a03909116815260200160405180910390f35b341561019d57600080fd5b61012b6004602481358181019083013580602081810201604051908101604052809392919081815260200183836020028082843782019150505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437509496506103e795505050505050565b005b341561022e57600080fd5b61012b600160a060020a0360043516610457565b005b341561024f57600080fd5b61012b6104db565b005b60025474010000000000000000000000000000000000000000900460ff1681565b600254600160a060020a03165b90565b600154600160a060020a031681565b60005433600160a060020a039081169116146102b457600080fd5b60025474010000000000000000000000000000000000000000900460ff1615156102dd57600080fd5b7f764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80828260405191825260208201526040908101905180910390a15b5b5b5050565b60005433600160a060020a0390811691161461033957600080fd5b600254600160a060020a03166302f085686040518163ffffffff1660e060020a028152600401600060405180830381600087803b151561037857600080fd5b6102c65a03f1151561038957600080fd5b5050505b5b565b60005433600160a060020a039081169116146103ab57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b600054600160a060020a031681565b6000805433600160a060020a0390811691161461040357600080fd5b60025474010000000000000000000000000000000000000000900460ff16151561042c57600080fd5b815183511461043a57600080fd5b6104448383610544565b905061038981610627565b5b5b5b505050565b60005433600160a060020a0390811691161461047257600080fd5b600254600160a060020a03166392eefe9b8260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b15156104c257600080fd5b6102c65a03f115156104d357600080fd5b5050505b5b50565b60005433600160a060020a039081169116146104f657600080fd5b6002805474ff0000000000000000000000000000000000000000191690557fdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed041260405160405180910390a15b5b565b600080805b845181101561061b57600254600160a060020a03166340c10f1986838151811061056f57fe5b9060200190602002015186848151811061058557fe5b9060200190602002015161ffff16670de0b6b3a76400000260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401600060405180830381600087803b15156105e057600080fd5b6102c65a03f115156105f157600080fd5b50505083818151811061060057fe5b9060200190602002015161ffff16820191505b600101610549565b8192505b505092915050565b600154600160a060020a0316151561063e57600080fd5b600254600154600160a060020a03918216916340c10f199116670de0b6b3a7640000840260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401600060405180830381600087803b15156104c257600080fd5b6102c65a03f115156104d357600080fd5b5050505b505600a165627a7a723058206ae8a8c28e4a416d7f9885bf95948280627794b59573f353ffb971eebf66b63f0029",
  "networks": {
    "4": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x2724ef0489b148ea2c0338a4919f2c1caeed4fbc",
      "updated_at": 1508371120078
    },
    "1506573017027": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xaab59d88451e5418ba74f0a3f8e4ed3c8695087d",
      "updated_at": 1506573035293
    },
    "1508262457826": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x0e729d44c86fdbcd28b6b973ac0f2255ca6005ea",
      "updated_at": 1508262483555
    },
    "1508349597018": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xf48a22ff89728b20aaab9c3ceb2f71af6ebe84dc",
      "updated_at": 1508351523668
    },
    "1508351558180": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x35b027677962454002a3952f006de9c5e25d5218",
      "updated_at": 1508351566151
    },
    "1508370900963": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xb8d54af85f1df4bd0ab981144c0531051bfaedc7",
      "updated_at": 1508370992445
    },
    "1509934429918": {
      "events": {
        "0x764499e570ea2dcca5d0e22358f141111b47ff60822a49407db2456c8f640a80": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "boardEndState",
              "type": "bytes32"
            }
          ],
          "name": "GamePlayed",
          "type": "event"
        },
        "0xdf469ccbe88d3fa5b8dc86f2ec56789684f26c46be3735d80d0788b9cfed0412": {
          "anonymous": false,
          "inputs": [],
          "name": "GameOver",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xbe758f027d6d53568373b1f8b3cf4ad404b5cf8c",
      "updated_at": 1509937268606
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1509937268606
}

export default contract;
const ForwardingWillAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willFee_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "feeReceiver_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "willLimit_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "erc20Whitelist_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "verifier_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "neededRole",
        "type": "bytes32"
      }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BeneficiaryLimitExceeded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Create2EmptyBytecode",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Create2FailedDeployment",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "Create2InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ECDSAInvalidSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "ECDSAInvalidSignatureLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "ECDSAInvalidSignatureS",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotEnoughEther",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SignatureInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TwoArraysLengthMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "WillLimitExceeded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WillNotFound",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "willId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "erc20Addresses",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "erc20Amounts",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ForwardingWillActivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "willId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "willAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "note",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "nickNames",
            "type": "string[]"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "percents",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct ForwardingWillStruct.AssetDistribution[]",
            "name": "distributions",
            "type": "tuple[]"
          }
        ],
        "indexed": false,
        "internalType": "struct ForwardingWillRouter.WillMainConfig",
        "name": "mainConfig",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "minRequiredSignatures",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "lackOfOutgoingTxRange",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "lackOfSignedMsgRange",
            "type": "uint128"
          }
        ],
        "indexed": false,
        "internalType": "struct ForwardingWillStruct.WillExtraConfig",
        "name": "extraConfig",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ForwardingWillCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "willId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ForwardingWillDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "willId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "nickNames",
        "type": "string[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "assets",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "percents",
            "type": "uint256[]"
          }
        ],
        "indexed": false,
        "internalType": "struct ForwardingWillStruct.AssetDistribution[]",
        "name": "distributions",
        "type": "tuple[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minRequiredSignatures",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ForwardingWillDistributionUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "willId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "lackOfOutgoingTxRange",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "lackOfSignedMsgRange",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ForwardingWillTriggerUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "OPERATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willId_",
        "type": "uint256"
      },
      {
        "internalType": "bytes[]",
        "name": "signatures_",
        "type": "bytes[]"
      },
      {
        "internalType": "address[]",
        "name": "signers_",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "erc20Addresses_",
        "type": "address[]"
      },
      {
        "internalType": "bytes",
        "name": "erc20Signature_",
        "type": "bytes"
      }
    ],
    "name": "activeWill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "addOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "beneficiaryLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "note",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "nickNames",
            "type": "string[]"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "percents",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct ForwardingWillStruct.AssetDistribution[]",
            "name": "distributions",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct ForwardingWillRouter.WillMainConfig",
        "name": "mainConfig_",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "minRequiredSignatures",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "lackOfOutgoingTxRange",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "lackOfSignedMsgRange",
            "type": "uint128"
          }
        ],
        "internalType": "struct ForwardingWillStruct.WillExtraConfig",
        "name": "extraConfig_",
        "type": "tuple"
      }
    ],
    "name": "createWill",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willId_",
        "type": "uint256"
      }
    ],
    "name": "deleteWill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "erc20Whitelist",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeReceiver",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender_",
        "type": "address"
      }
    ],
    "name": "getNextWillAddressOfUser",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "nonceByUsers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "removeOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willId_",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "lackOfOutgoingTxRange_",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "lackOfSignedMsgRange_",
        "type": "uint128"
      }
    ],
    "name": "setActivationTrigger",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "limit_",
        "type": "uint256"
      }
    ],
    "name": "setBeneficiaryLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc20Whitelist_",
        "type": "address"
      }
    ],
    "name": "setErc20WhitelistAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willFee_",
        "type": "uint256"
      }
    ],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "feeReceiver_",
        "type": "address"
      }
    ],
    "name": "setFeeReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "verifier_",
        "type": "address"
      }
    ],
    "name": "setVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willLimit_",
        "type": "uint256"
      }
    ],
    "name": "setWillLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willId_",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "nickNames_",
        "type": "string[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "assets",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "percents",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct ForwardingWillStruct.AssetDistribution[]",
        "name": "distributions_",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "minRequiredSigs_",
        "type": "uint256"
      }
    ],
    "name": "updateWillAssetsDistribution",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "willAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "willCountByUsers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "willFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "willId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "willLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "willId_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "name": "withdrawEthFromWill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default ForwardingWillAbi;

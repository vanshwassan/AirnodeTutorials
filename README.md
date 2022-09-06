# Part 1 - Deploying the Airnode

## Requirements

- You will need an [Amazon Web Services (AWS)](https://aws.amazon.com) account  before Airnode can be deployed

- You will need [Docker](https://docs.docker.com/get-docker/) installed locally

## Adding your credentials

- Get your AWS IAM Access Keys with Administrator Access policy. You can watch this [video](https://www.youtube.com/watch?v=KngM5bfpttA) if you're not sure how to obtain them.

- Populate the aws.env file with your ``` AWS_ACCESS_KEY_ID ``` and ``` AWS_SECRET_ACCESS_KEY ```

- Under the config directory, look for ```secrets.env``` and add in your ```AIRNODE_WALLET_MNEMONIC```. Make sure you use the same mnemonic that you used to sign in with ChainAPI otherwise it will show your deployment as "inactive" on the ChainAPI's deployments section. </br> 

- Add in your ```POLYGON_MUMBAI_TESTNET_1_PROVIDER_URL```. You can have a different name for the Provider URL depending on what network you choose during integration. 

- Your secrets file will also have ```HEARTBEAT_URL```, ```HEARTBEAT_ID``` and ```HEARTBEAT_API_KEY``` that is automatically generated by ChainAPI to check if an Airnode is active or not. You can disable it in ```config.json``` but it is not recommended as your deployments on ChainAPI will be marked as “inactive” and limit future opportunities.

- You can add in your ```HTTP_SIGNED_DATA_GATEWAY_API_KEY``` and ``` HTTP_GATEWAY_API_KEY_BETWEEN_30_TO_120_CHARACTERS``` (You can also use the values that are pre-filled by ChainAPI). The HTTP gateway is an optional service that allows authenticated users to make HTTP requests to your deployed Airnode instance. This is used for testing and future services provided by API3 and ChainAPI.

## Deploying the Airnode

- Open a terminal and change directory to where you extracted these files.

- Run the following Docker command based on your current operating system. Follow any prompts or instructions.

- You can more detailed information in the [API3 Deployment Tutorial](https://docs.api3.org/airnode/v0.7/grp-providers/tutorial/) 

#### Windows
```
docker run -it --rm ^
      --env-file aws.env ^
      -v "%cd%/config:/app/config" ^
      -v "%cd%/output:/app/output" ^
      api3/airnode-deployer:0.7.3 deploy
```

#### OSX
```
docker run -it --rm \
      --env-file aws.env \
      -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
      -v "$(pwd)/config:/app/config" \
      -v "$(pwd)/output:/app/output" \
      api3/airnode-deployer:0.7.3 deploy
```

#### Linux
```
docker run -it --rm \
      --env-file aws.env \
      -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
      -v "$(pwd)/config:/app/config" \
      -v "$(pwd)/output:/app/output" \
      api3/airnode-deployer:0.7.3 deploy
```

# Part 2 - Coding the Requester Contract and calling the Airnode

## Requirements

- Clone and set up the [Airnode Monorepo](). install and build all the dependencies and packages to be able to access the Airnode CLI.

- Using [Remix IDE](https://remix.ethereum.org) to deploy and call the Requester contract on the Polygon Mumbai Testnet.

- Wallet with enough Matic to sponsor the sponsorWallet. You can get some from the [Mumbai Faucet](https://mumbaifaucet.com/).

## Setting up the Remix IDE

- Compile and Deploy the ```Requester.sol``` contract on Remix. Select the ```_rrpAddress``` from [here](https://docs.api3.org/airnode/v0.7/reference/airnode-addresses.html).

- Derive your ```sponsorWallet``` address using the Airnode CLI.

#### Linux:
```
npx @api3/airnode-admin derive-sponsor-wallet-address \
  --airnode-xpub xpub6CUGRUo... \
  --airnode-address 0xe1...dF05s \
  --sponsor-address 0xF4...dDyu9
```

#### Windows:
```
npx @api3/airnode-admin derive-sponsor-wallet-address ^
  --airnode-xpub xpub6CUGRUo... ^
  --airnode-address 0xe1...dF05s ^
  --sponsor-address 0xF4...dDyu9
```

Fund the ```sponsorWallet``` with some test MATIC

- Pass in your ```airnode```, ```endpointID```, ```sponsor``` (The Requester contract itself) and the ```sponsorWallet``` (derived from the Airnode CLI) to call the ```makeRequest``` function.

- Check the latest transaction from the ```sponsorWallet``` and go to logs. The requested data will be encoded in ```bytes32```.
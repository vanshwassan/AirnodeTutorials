# ChainAPI Deployment README

Welcome to the ChainAPI deployment README! This guide will explain the various files
contained in the zip file that are required for deploying an Airnode instance, how they
work and what is required from you in order to get up and running as quickly as possible.

- [ChainAPI Deployment README](#chainapi-deployment-readme)
  - [Reading this document](#reading-this-document)
  - [Requirements](#requirements)
  - [Quick start](#quick-start)
    - [Step 1: Create account resources](#step-1-create-account-resources)
    - [Step 2: Populate .env files with secrets](#step-2-populate-env-files-with-secrets)
    - [Step 3: Open a terminal where you saved the files](#step-3-open-a-terminal-where-you-saved-the-files)
      - [Windows](#windows)
      - [OSX or Linux](#osx-or-linux)
    - [Step 4: Run the Airnode deployer tool](#step-4-run-the-airnode-deployer-tool)
      - [Windows](#windows-1)
      - [OSX](#osx)
      - [Linux](#linux)
    - [Step 5: Inspect your Airnode](#step-5-inspect-your-airnode)
  - [Files](#files)
    - [config/config.json](#configjson)
    - [config/secrets.env](#secretsenv)
    - [aws.env](#awsenv)

## Reading this document

This README is provided in [Markdown format](https://www.markdownguide.org/) in order to provide 
a richer user experience. It is advisable to use a tool to view this file. Some options:

**Option A**: Pasting the contents into a [Github Gist](https://gist.github.com/). You will need to 
create a Github account first.

**Option B**: Opening with a text editor

- [Visual Studio Code](https://code.visualstudio.com/) with [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) installed

**Option C**: Some other helpful Markdown viewing websites (no affiliation with ChainAPI):

- [Markdown Live Preview](https://markdownlivepreview.com/)
- [Dillinger](https://dillinger.io/)
- [StackEdit](https://stackedit.io/app#)
- [Editor.md](https://pandao.github.io/editor.md/en.html)

## Requirements

You will need account(s) with the following services before Airnode can be deployed

- [Amazon Web Services (AWS)](https://aws.amazon.com)

You will need the following tools installed locally

- [Docker](https://docs.docker.com/get-docker/)

## Quick start

### Step 1: Create account resources

Create the relevant account and project resources through your preferred cloud provider(s) web 
interface. ChainAPI recommends following the [API3 guides](https://docs.api3.org/airnode/v0.7/grp-providers/docker/deployer-image.html#cloud-provider-credentials).

### Step 2: Populate .env files with secrets

Populate the `.env` file(s) provided with this README with your secrets for your API and other 
important accounts. Follow the comments in the files for how to populate specific keys.

### Step 3: Open a terminal where you saved the files

Open a terminal and change directory to where you extracted these files. This can be done using the 
following commands.

#### Windows

Click start, type "cmd" and hit enter. This should open a Command Prompt window. Type `cd my-folder` 
to move to the "my-folder" directory. Type `cd ..` to move up a directory.

#### OSX or Linux

Open a terminal window and type `cd my-folder` to move to the "my-folder" directory. Type `cd ..` 
to move up a directory.

### Step 4: Run the Airnode deployer tool

Run the following Docker command based on your current operating system. Follow any prompts or instructions.

You can more detailed information in the [API3 Deployment Tutorial](https://docs.api3.org/airnode/v0.7/grp-providers/tutorial/) 

#### Windows
```
docker run -it --rm ^
      --env-file aws.env ^
      -v "%cd%/config:/app/config" ^
      -v "%cd%/output:/app/output" ^
      api3/airnode-deployer:0.7.2 deploy
```

#### OSX
```
docker run -it --rm \
      --env-file aws.env \
      -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
      -v "$(pwd)/config:/app/config" \
      -v "$(pwd)/output:/app/output" \
      api3/airnode-deployer:0.7.2 deploy
```

#### Linux
```
docker run -it --rm \
      --env-file aws.env \
      -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
      -v "$(pwd)/config:/app/config" \
      -v "$(pwd)/output:/app/output" \
      api3/airnode-deployer:0.7.2 deploy
```

### Step 5: Inspect your Airnode

If successful, your Airnode should now be deployed to your preferred cloud provider(s)! Log in 
through the relevant cloud provider account portal and you should be able to see the deployed 
Airnode resources. These will be linked to how the cloud provider "serverless" functions. i.e. 
For AWS, you will find your Airnode resources under "Lambda". For GCP, you will find these resources 
under "Cloud Functions".

## Files

### config/config.json

**NO USER INPUT REQUIRED**

`config.json` defines a single Airnode and how the node should function. By default, Airnode does 
not contain any kind of dynamic database or cache, but the config.json file can be thought of as a 
kind of static database provided when starting the node. Whenever Airnode needs information around 
things like what endpoints are available, how they can be called, which blockchains are supported etc, 
it will reference the `config.json` file. More dynamic data, such as account balances and API call 
requests are fetched directly from the blockchains themselves. By doing this, Airnode is able 
to only use a single source of truth (the blockchain) instead of trying to replicate blockchain data 
locally which can very easily become out of sync.

The contents of `config.json` are defined as a JSON file which allows Airnode an easy way of 
reading the file. JSON is also human-readable, so you're able to open this file with any text editor 
and make any additional configuration changes. ChainAPI has already provided a fully formed 
config.json for you that has been included with this README. `config.json` is blockchain and 
platform agnostic and can be re-used for Airnode deployments on any platform.

One important thing to note is that you typically do not want to define any kind of secret value
directly in `config.json`. Secret values are referenced using the following syntax:
```
"secretKey": "${MY_SECRET_VALUE}"
```
The Airnode deployer tool processes and injects these values in order to store them securely on your
preferred cloud provider(s) such as Amazon Web Services (AWS) and Google Cloud Platform (GCP).

Read more: https://docs.api3.org/airnode/v0.7/reference/deployment-files/config-json.html

### config/secrets.env

**USER INPUT REQUIRED**

`secrets.env` is a key-value list of secret values that are available to the Airnode instance. At 
no point does ChainAPI have access to any of your application or personal secrets. Also note that 
you should NEVER share this file or upload it anywhere that you do not trust to be secure.

By convention, secret keys should be defined as all upper case words, joined with underscores. 
Secret values can be in any format and are surrounded by double quotes when the value contains spaces. 
Examples:
```
AIRNODE_WALLET_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
MY_API_KEY=bba353e9-f9b2-44cb-857b-101537e7ee74
```
This file can also contain comments, using "#". Everything after "#" on the same line will be ignored 
and can be used for human-readable explanations.

ChainAPI has provided a template `secrets.env` file included with this README that contains all of 
the required (auto-generated) keys for your Airnode deployment. These keys are based on how you 
configured your deployment and integrations through the ChainAPI interface. This file also contains 
explanatory comments for each group of secrets.

**Please open the secrets.env file with your preferred text editor and enter the required secret values**

Read more: https://docs.api3.org/airnode/v0.7/reference/deployment-files/secrets-env.html


### aws.env

**USER INPUT REQUIRED**

aws.env is another simple key-value file that defines how the Airnode deployer tool should authenticate
and authorize your account to deploy to AWS. As you selected to deploy to AWS through the ChainAPI
deployment wizard, you will need to fill out this file in a similar way to secrets.env

Read more: https://docs.api3.org/airnode/v0.7/reference/deployment-files/aws-env.html

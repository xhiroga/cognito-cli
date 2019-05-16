@hiroga/cognito-userpool-cli
============================

cli tool for Cognito UserPool (ex. signin, forgotPasswordSubmit, etc...)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@hiroga/cognito-userpool-cli.svg)](https://npmjs.org/package/@hiroga/cognito-userpool-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@hiroga/cognito-userpool-cli.svg)](https://npmjs.org/package/@hiroga/cognito-userpool-cli)
[![License](https://img.shields.io/npm/l/@hiroga/cognito-userpool-cli.svg)](https://github.com/hiroga-cc/cognito-userpool-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hiroga/cognito-userpool-cli
$ cognito-userpool-cli COMMAND
running command...
$ cognito-userpool-cli (-v|--version|version)
@hiroga/cognito-userpool-cli/0.1.7 darwin-x64 node-v10.5.0
$ cognito-userpool-cli --help [COMMAND]
USAGE
  $ cognito-userpool-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cognito-userpool-cli configure`](#cognito-userpool-cli-configure)
* [`cognito-userpool-cli forgot-password`](#cognito-userpool-cli-forgot-password)
* [`cognito-userpool-cli get-id`](#cognito-userpool-cli-get-id)
* [`cognito-userpool-cli help [COMMAND]`](#cognito-userpool-cli-help-command)
* [`cognito-userpool-cli signin`](#cognito-userpool-cli-signin)

## `cognito-userpool-cli configure`

describe the command here

```
USAGE
  $ cognito-userpool-cli configure

OPTIONS
  -a, --authenticationFlowType=authenticationFlowType  authentication flow type
  -c, --client=client                                  userpool client id
  -f, --federatedIdentity=federatedIdentity            federated identity id
  -h, --help                                           show CLI help
  -r, --region=region                                  region
  -u, --userpool=userpool                              userpool id
```

_See code: [src/commands/configure.ts](https://github.com/hiroga-cc/cognito-userpool-cli/blob/v0.1.7/src/commands/configure.ts)_

## `cognito-userpool-cli forgot-password`

describe the command here

```
USAGE
  $ cognito-userpool-cli forgot-password

OPTIONS
  -c, --code=code          confirmation code
  -p, --password=password  newpassword
  -s, --submit             submit new password
  -u, --user=user          username to reset password
```

_See code: [src/commands/forgot-password.ts](https://github.com/hiroga-cc/cognito-userpool-cli/blob/v0.1.7/src/commands/forgot-password.ts)_

## `cognito-userpool-cli get-id`

describe the command here

```
USAGE
  $ cognito-userpool-cli get-id

OPTIONS
  -h, --help         show CLI help
  -t, --token=token  token
```

_See code: [src/commands/get-id.ts](https://github.com/hiroga-cc/cognito-userpool-cli/blob/v0.1.7/src/commands/get-id.ts)_

## `cognito-userpool-cli help [COMMAND]`

display help for cognito-userpool-cli

```
USAGE
  $ cognito-userpool-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `cognito-userpool-cli signin`

describe the command here

```
USAGE
  $ cognito-userpool-cli signin

OPTIONS
  -h, --help                 show CLI help
  -p, --password=password    password
  -u, --user=user            user
  --newPassword=newPassword  new-password
```

_See code: [src/commands/signin.ts](https://github.com/hiroga-cc/cognito-userpool-cli/blob/v0.1.7/src/commands/signin.ts)_
<!-- commandsstop -->

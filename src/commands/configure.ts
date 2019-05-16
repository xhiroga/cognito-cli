import { Command, flags } from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

const initialConfig = {
  "Auth": {
    "region": "",
    "userPoolId": "",
    "userPoolWebClientId": "",
    "authenticationFlowType": ""
  },
  "CognitoIdentity": {
    "IdentityPoolId": ""
  }
}


// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html
const AuthFlows = [
  "USER_SRP_AUTH",
  "REFRESH_TOKEN_AUTH",
  "REFRESH_TOKEN",
  "CUSTOM_AUTH",
  "USER_PASSWORD_AUTH",
  // ADMIN_NO_SRP_AUTH → Amplifyでは利用不能
]

export default class Configure extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    region: flags.string({ char: 'r', description: 'region' }),
    userpool: flags.string({ char: 'u', description: 'userpool id' }),
    client: flags.string({ char: 'c', description: 'userpool client id' }),
    federatedIdentity: flags.string({ char: 'f', description: 'federated identity id' }),
    authenticationFlowType: flags.string({ char: 'a', description: 'authentication flow type' }),
  }

  async run() {
    const { args, flags } = this.parse(Configure)

    mkdirp.sync(this.config.configDir);
    const configPath = path.join(this.config.configDir, 'config.json')

    let userConfig
    if (fs.existsSync(configPath)) {
      userConfig = await fs.readJSON(configPath)
    } else {
      userConfig = initialConfig
    }

    if (flags.region) { userConfig.Auth.region = flags.region }
    if (flags.userpool) { userConfig.Auth.userPoolId = flags.userpool }
    if (flags.client) { userConfig.Auth.userPoolWebClientId = flags.client }
    if (flags.authenticationFlowType) {
      if (AuthFlows.includes(flags.authenticationFlowType)) {
        userConfig.Auth.authenticationFlowType = flags.authenticationFlowType
      } else {
        this.log(`Error: authenticationFlowType should be one of ${AuthFlows}`)
        return
      }
    }
    if (flags.federatedIdentity) { userConfig.CognitoIdentity.IdentityPoolId = flags.federatedIdentity }

    this.log(`config: ${JSON.stringify(userConfig)}`)


    fs.writeFile(configPath, JSON.stringify(userConfig, null, 2))
  }
}

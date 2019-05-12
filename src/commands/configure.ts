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
    // flag with a value (-r, --region=VALUE)
    region: flags.string({ char: 'r', description: 'region to access' }),
    // flag with a value (-u, --userpool=VALUE)
    userpool: flags.string({ char: 'u', description: 'userpool id to access' }),
    // flag with a value (-c, --client=VALUE)
    client: flags.string({ char: 'c', description: 'userpool client id to access' }),

    authenticationFlowType: flags.string({ char: 'f', description: 'authentication flow type' }),
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

    this.log(`config.Auth: ${JSON.stringify(userConfig.Auth)}`)

    fs.writeFile(configPath, JSON.stringify(userConfig, null, 2))
  }
}

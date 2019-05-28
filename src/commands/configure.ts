import { Command, flags } from '@oclif/command'
import Config from '../config'


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
    profile: flags.string({ description: 'configure name' })
  }

  async run() {
    const { args, flags } = this.parse(Configure)

    const config = await Config.load(this.config.configDir, flags.profile)
    if (config === undefined) {
      throw Error("Cannnot read user configuration")
    }

    if (flags.region) { config.Auth.region = flags.region }
    if (flags.userpool) { config.Auth.userPoolId = flags.userpool }
    if (flags.client) { config.Auth.userPoolWebClientId = flags.client }
    if (flags.authenticationFlowType) {
      if (AuthFlows.includes(flags.authenticationFlowType)) {
        config.Auth.authenticationFlowType = flags.authenticationFlowType
      } else {
        this.log(`Error: authenticationFlowType should be one of ${AuthFlows}`)
        return
      }
    }
    if (flags.federatedIdentity) { config.CognitoIdentity.IdentityPoolId = flags.federatedIdentity }

    this.log(`config: ${JSON.stringify(config)}`)

    await Config.save(config, this.config.configDir, flags.profile)

  }
}

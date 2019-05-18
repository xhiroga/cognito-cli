import { Command, flags } from '@oclif/command'
import { CognitoIdentity } from "aws-sdk"

import Config from '../config'

export default class GetOpenIdToken extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    id: flags.string({ char: 'i', description: 'This known Cognito ID is returned by GetId.' }),
    token: flags.string({ char: 't', description: 'token' }),
  }

  async run() {
    const { args, flags } = this.parse(GetOpenIdToken)
    if (!flags.token || !flags.id) {
      throw new Error(`token and id should not be empty`)
    }

    const config = await Config.get(this.config.configDir)
    const region: string = config.Auth.region
    const userPoolId: string = config.Auth.userPoolId

    const cognitoidentity = new CognitoIdentity({
      region: region
    });

    const provider: string = `cognito-idp.${region}.amazonaws.com/${userPoolId}`
    type Dict = { [key: string]: string };
    const logins: Dict = { [provider]: flags.token }

    const param = {
      IdentityId: flags.id,
      Logins: logins
    }

    const identityIdAndToken = await new Promise((resolve, reject) => {
      cognitoidentity.getOpenIdToken(param, function (err, data) {
        if (err) {
          reject(err); return
        }
        resolve(data)
      })
    })

    this.log(`IdentityId: ${JSON.stringify({ identityIdAndToken })}`)
  }
}

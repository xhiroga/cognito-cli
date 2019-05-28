import { Command, flags } from '@oclif/command'
import { CognitoIdentity } from "aws-sdk"

import Config from '../config'
import { GetIdInput } from 'aws-sdk/clients/cognitoidentity';

export default class GetId extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    token: flags.string({ char: 't', description: 'token' }),
    profile: flags.string({ description: 'configure name' })
  }

  async run() {
    const { args, flags } = this.parse(GetId)
    if (!flags.token) {
      throw new Error(`flags.token should not be empty`)
    }

    const config = await Config.load(this.config.configDir, flags.profile)
    const region: string = config.Auth.region
    const userPoolId: string = config.Auth.userPoolId

    const cognitoidentity = new CognitoIdentity({
      region: region
    });

    const provider: string = `cognito-idp.${region}.amazonaws.com/${userPoolId}`
    type Dict = { [key: string]: string };
    const logins: Dict = { [provider]: flags.token }

    const param: GetIdInput = {
      IdentityPoolId: config.CognitoIdentity.IdentityPoolId,
      Logins: logins
    }

    const identityId = await new Promise((resolve, reject) => {
      cognitoidentity.getId(param, function (err, data) {
        if (err) {
          reject(err); return
        }
        resolve(data.IdentityId)
      })
    })

    this.log(`IdentityId: ${JSON.stringify({ identityId })}`)
  }
}

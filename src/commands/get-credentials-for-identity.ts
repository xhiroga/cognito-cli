import { Command, flags } from '@oclif/command'
import { CognitoIdentity, Credentials } from "aws-sdk"

import Config from '../config'

export default class GetCredentialsForIdentity extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    id: flags.string({ char: 'i', description: 'This known Cognito ID is returned by GetId.' }),
    token: flags.string({ char: 't', description: 'token' }),
    profile: flags.string({ description: 'configure name' })
  }

  async run() {
    const { args, flags } = this.parse(GetCredentialsForIdentity)
    const config = await Config.load(this.config.configDir, flags.profile)
    const region: string = config.Auth.region
    const userPoolId: string = config.Auth.userPoolId

    const cognitoidentity = new CognitoIdentity({
      region: region
    });

    const token = flags.token ? flags.token : config.Response.idToken
    const id = flags.id ? flags.id : config.Response.identityId
    if (!token || !id) {
      throw new Error(`token and id should not be empty`)
    }

    const provider: string = `cognito-idp.${region}.amazonaws.com/${userPoolId}`
    type Dict = { [key: string]: string };
    const logins: Dict = { [provider]: token }

    const param = {
      IdentityId: id,
      Logins: logins
    }

    const credentials: CognitoIdentity.Credentials = await new Promise((resolve, reject) => {
      cognitoidentity.getCredentialsForIdentity(param, function (err, data) {
        if (err) {
          reject(err); return
        }
        resolve(data.Credentials)
      })
    })

    console.log()
    const response = {
      "accessKeyId": credentials.AccessKeyId,
      "secretKey": credentials.SecretKey,
      "sessionToken": credentials.SessionToken
    }
    this.log(`${JSON.stringify(response)}`)
    Object.assign(config.Response, response)
    await Config.save(config, this.config.configDir, flags.profile)
  }
}

import { Command, flags } from '@oclif/command'
import fetch, { Request, RequestInit, Response } from 'node-fetch';

interface Global { fetch(url: string | Request, init?: RequestInit | undefined): Promise<Response> }
declare var global: Global
global.fetch = fetch

import * as fs from 'fs-extra'
import * as path from 'path'
import amplify from 'aws-amplify'

export default class Signin extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    user: flags.string({ char: 'u', description: 'user' }),
    password: flags.string({ char: 'p', description: 'password' }),
    newPassword: flags.string({ description: 'new-password' })
  }

  async run() {
    const { args, flags } = this.parse(Signin)
    if (!flags.user || !flags.password) {
      this.log(`parameter user and password is required!`)
      return
    }

    const configPath = path.join(this.config.configDir, 'config.json')
    const userConfig = await fs.readJSON(configPath)
    amplify.configure(userConfig);

    const Auth = amplify.Auth
    Auth.signIn(flags.user, flags.password)
      .then((user: any) => {
        console.log(user)
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(
            user,               // the Cognito User Object
            flags.newPassword,       // the new password
            // OPTIONAL, the required attributes
          ).then((user: any) => {
            console.log(user);
          }).catch((e: any) => {
            console.log(e);
          });
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}

import { Command, flags } from '@oclif/command'
import Authx from "../authx"
import Config from '../config'

export default class Signin extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    user: flags.string({ char: 'u', description: 'user' }),
    password: flags.string({ char: 'p', description: 'password' }),
    newPassword: flags.string({ char: 'n', description: 'new-password' }),
    profile: flags.string({ description: 'configure name' })
  }

  async run() {
    const { args, flags } = this.parse(Signin)
    if (!flags.user || !flags.password) {
      this.log(`parameter user and password is required!`)
      return
    }

    const config = await Config.load(this.config.configDir, flags.profile)
    const authx = new Authx(config)
    const user = await authx.signIn(flags.user, flags.password, flags.newPassword)

    const response = {
      "idToken": user.signInUserSession.idToken.jwtToken,
      "refreshToken": user.signInUserSession.refreshToken.token,
      "accessToken": user.signInUserSession.accessToken.jwtToken
    }
    this.log(`${JSON.stringify(response)}`)
    Object.assign(config.Response, response)
    await Config.save(config, this.config.configDir, flags.profile)
  }
}

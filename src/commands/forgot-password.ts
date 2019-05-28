import { Command, flags } from '@oclif/command'
import Authx from "../authx"
import Config from '../config'


export default class ForgotPassword extends Command {
  static description = 'describe the command here'

  static flags = {
    user: flags.string({ char: 'u', description: 'username to reset password' }),
    code: flags.string({ char: 'c', description: 'confirmation code' }),
    password: flags.string({ char: 'p', description: 'newpassword' }),
    profile: flags.string({ description: 'configure name' })
  }

  async run() {
    const { args, flags } = this.parse(ForgotPassword)
    const config = await Config.load(this.config.configDir, flags.profile)
    const authx = new Authx(config)

    if (flags.user && !flags.code && !flags.password) {
      const response = await authx.forgotPassword(flags.user)
      this.log(`response: ${JSON.stringify(response)}`)
    } else if (flags.user && flags.code && flags.password) {
      await authx.forgotPasswordSubmit(flags.user, flags.code, flags.password)
      this.log(`response: OK`)
    } else {
      throw new Error(`for reset password, only user is required. for submit new password, user, code and password are all required.`)
    }
  }
}

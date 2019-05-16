import { Command, flags } from '@oclif/command'
import Authx from "../authx"

import * as fs from 'fs-extra'
import * as path from 'path'

export default class ForgotPassword extends Command {
  static description = 'describe the command here'

  static flags = {
    user: flags.string({ char: 'u', description: 'username to reset password' }),
    submit: flags.boolean({ char: 's', description: 'submit new password' }),
    code: flags.string({ char: 'c', description: 'confirmation code' }),
    password: flags.string({ char: 'p', description: 'newpassword' })
  }

  async run() {
    const { args, flags } = this.parse(ForgotPassword)
    if (!flags.user) {
      this.log(`parameter user is required!`)
      return
    }
    const configPath = path.join(this.config.configDir, 'config.json')
    const userConfig = await fs.readJSON(configPath)
    const authx = new Authx(userConfig)

    if (!flags.submit) {
      const response = await authx.forgotPassword(flags.user)
      this.log(`response: ${JSON.stringify(response)}`)
    } else {
      if (!flags.code || !flags.password) {
        throw new Error()
      }
      await authx.forgotPasswordSubmit(flags.user, flags.code, flags.password)
      this.log(`response: OK`)
    }
  }
}

import { Command, flags } from '@oclif/command'
import Authx from "../authx"

import * as fs from 'fs-extra'
import * as path from 'path'

export default class ForgetPassword extends Command {
  static description = 'describe the command here'

  static flags = {
    user: flags.string({ char: 'u', description: 'username to reset password' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(ForgetPassword)
    if (!flags.user) {
      this.log(`parameter user is required!`)
      return
    }

    const configPath = path.join(this.config.configDir, 'config.json')
    const userConfig = await fs.readJSON(configPath)

    const authx = new Authx(userConfig)
    const response = await authx.forgotPassword(flags.user)
    this.log(`response: ${JSON.stringify(response)}`)
  }
}

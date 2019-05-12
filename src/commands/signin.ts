import { Command, flags } from '@oclif/command'
import Authx from "../authx"

import * as fs from 'fs-extra'
import * as path from 'path'

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

    const authx = new Authx(userConfig)
    const user = await authx.signIn(flags.user, flags.password, flags.newPassword)
    this.log(`user: ${JSON.stringify(user)}`)
  }
}

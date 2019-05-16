import * as fs from 'fs-extra'
import * as path from 'path'

export default class Config {
    static async get(dir: string) {
        const configPath = path.join(dir, 'config.json')
        const userConfig = await fs.readJSON(configPath)
        return userConfig
    }
}
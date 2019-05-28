import * as fs from 'fs-extra'
import * as mkdirp from 'mkdirp'
import * as path from 'path'

const initialConfig = {
    "Auth": {
        "region": "",
        "userPoolId": "",
        "userPoolWebClientId": "",
        "authenticationFlowType": ""
    },
    "CognitoIdentity": {
        "IdentityPoolId": ""
    },
    "Response": {
        "idToken": "",
        "refreshToken": "",
        "accessToken": "",
        "identityId": "",
        "openIdToken": "",
        "accessKeyId": "",
        "secretKey": "",
        "sessionToken": ""
    }
}

export default class Config {
    static getPath(dir: string, profile?: string) {
        mkdirp.sync(dir);
        const configFile = profile ? `config.${profile}.json` : 'config.json'
        return path.join(dir, configFile) // ~/.config/@hiroga/cognito-userpool-cli/config.*.json
    }

    static async load(dir: string, profile?: string) {
        const config = initialConfig
        const configPath = this.getPath(dir, profile)

        if (fs.existsSync(configPath)) {
            const userConfig = await fs.readJSON(configPath)
            if (userConfig.Auth.region) { config.Auth.region = userConfig.Auth.region }
            if (userConfig.Auth.userPoolId) { config.Auth.userPoolId = userConfig.Auth.userPoolId }
            if (userConfig.Auth.userPoolWebClientId) { config.Auth.userPoolWebClientId = userConfig.Auth.userPoolWebClientId }
            if (userConfig.Auth.authenticationFlowType) { config.Auth.authenticationFlowType = userConfig.Auth.authenticationFlowType }
            if (userConfig.CognitoIdentity.IdentityPoolId) { config.CognitoIdentity.IdentityPoolId = userConfig.CognitoIdentity.IdentityPoolId }
            if (userConfig.Response) { config.Response = userConfig.Response }
        } else {
            console.log(`profile ${profile} is initialized.`)
        }
        return config
    }
    static async save(config: any, dir: string, profile?: string) {
        const configPath = this.getPath(dir, profile)
        await fs.writeFile(configPath, JSON.stringify(config, null, 2))
    }
}
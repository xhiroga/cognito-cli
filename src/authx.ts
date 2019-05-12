import fetch, { Request, RequestInit, Response } from 'node-fetch';

interface Global { fetch(url: string | Request, init?: RequestInit | undefined): Promise<Response> }
declare var global: Global
global.fetch = fetch

import amplify from 'aws-amplify'

export default class Authx {

    constructor(config: any) {
        amplify.configure(config);
    }

    /**
     * signIn仕様についてメモ
     * Clientに`USER_PASSWORD_AUTH` が許可されていない場合、`USER_PASSWORD_AUTH flow not enabled for this client` などエラーになる。
     * CognitoUser: authenticationFlowType:の値はUserPoolのデフォルトの認証フローに過ぎない。
     */
    async signIn(username: String, password: String, newPassword?: String) {
        return amplify.Auth.signIn(username, password)
            .then(async (user: any) => {
                console.log(user)
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    user = await amplify.Auth.completeNewPassword(
                        user,               // the Cognito User Object
                        newPassword,       // the new password
                        // OPTIONAL, the required attributes
                    ).then((user: any) => {
                        console.log(user);
                        return user
                    }).catch((e: any) => {
                        console.log(e);
                    });
                }
                return user
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    async forgotPassword(username: String) {
        return amplify.Auth.forgotPassword(username)
            .then((data: any) => { console.log(data); return data })
            .catch((err: any) => console.log(err));
    }

    async forgotPasswordSubmit(username: String, code: String, newPassword: String) {
        return amplify.Auth.forgotPasswordSubmit(username, code, newPassword)
            .then((data: any) => { console.log(data); return data })
            .catch((err: any) => console.log(err));
    }


}

import {expect, test} from '@oclif/test'

describe('get-credentials-for-identity', () => {
  test
    .stdout()
    .command(['get-credentials-for-identity'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['get-credentials-for-identity', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

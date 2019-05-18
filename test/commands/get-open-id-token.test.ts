import {expect, test} from '@oclif/test'

describe('get-open-id-token', () => {
  test
    .stdout()
    .command(['get-open-id-token'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['get-open-id-token', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

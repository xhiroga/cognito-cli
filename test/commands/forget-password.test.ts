import {expect, test} from '@oclif/test'

describe('forget-password', () => {
  test
    .stdout()
    .command(['forget-password'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['forget-password', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

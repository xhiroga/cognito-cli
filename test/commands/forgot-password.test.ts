import { expect, test } from '@oclif/test'

describe('foroet-password', () => {
  test
    .stdout()
    .command(['forgot-password'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['forgot-password', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

import { createPadZero } from './zeroPadding'

describe('ゼロパディング', () => {
  // 2桁 - テスト
  it('2桁テスト: 4を0埋めすると"04"です', () => {
    const padZero2 = createPadZero(2)
    expect(padZero2(4)).toBe('04')
  })
  it('2桁テスト: 0を0埋めすると"00"です', () => {
    const padZero2 = createPadZero(2)
    expect(padZero2(0)).toBe('00')
  })
  it('2桁テスト: 10以上の数字は0そのまま返却します。例えば12を0埋めすると12です', () => {
    const padZero2 = createPadZero(2)
    expect(padZero2(12)).toBe('12')
  })

  // 5桁 - テスト
  it('5桁テスト: 4を0埋めすると"04"です', () => {
    const padZero5 = createPadZero(5)
    expect(padZero5(4)).toBe('00004')
  })
  it('5桁テスト: 0を0埋めすると"00"です', () => {
    const padZero5 = createPadZero(5)
    expect(padZero5(0)).toBe('00000')
  })
  it('5桁テスト: 10以上の数字は0そのまま返却します。例えば12345を0埋めすると12345です', () => {
    const padZero5 = createPadZero(5)
    expect(padZero5(12345)).toBe('12345')
  })

  it.skip('1を0埋めすると"01"です', () => {})
})

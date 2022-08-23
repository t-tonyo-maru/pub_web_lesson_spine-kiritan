/**
 * target 引数を任意の桁数 digits で 0 詰めします
 * number -> number -> string
 * @param {number} digits - 0 詰めする桁数（正の整数であること）
 * @param {number} target - 0 詰め対象の数値
 * @return {string} - 0 詰め後の数値
 */
export const createPadZero = (digits: number) => {
  return (target: number) => {
    return ('0'.repeat(digits) + target).slice(digits * -1)
  }
}

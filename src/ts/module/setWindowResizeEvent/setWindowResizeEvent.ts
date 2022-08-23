/**
 * windowリサイズ時に引数のcallback関数を実行するイベントを設定する関数
 * @param {T} callback - callback関数。ジェネリクスで指定する
 * @param {number} offset - windowリサイズ時の時間偏差。offsetミリ秒だけ待機した後にcallbackを発火させる。
 *                          もしoffsetミリ秒内に、再びwindowリサイズした場合に、callbackは発火しない。
 */
export const setWindowResizeEvent = <T>({
  callback,
  offset = 200
}: {
  callback: T
  offset: number
}) => {
  let timer: number = 0
  let currentWidth = window.innerWidth

  window.addEventListener('resize', () => {
    if (timer > 0) {
      clearTimeout(timer)
    }

    if (currentWidth === window.innerWidth) return

    timer = window.setTimeout(() => {
      // windowのresize時の処理
      if (typeof callback === 'function') callback()
    }, offset)
  })
}

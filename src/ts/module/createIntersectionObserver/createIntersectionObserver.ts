/**
 * 交差オブザーバー(IntersectionObserver)を返却する関数
 * IntersectionObserver: https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API
 * JSでのスクロール連動エフェクトにはIntersection Observerが便利: https://ics.media/entry/190902/
 *
 * @param {IntersectionObserverInit} options - IntersectionObserverのオプション
 * @param {IntersectionObserverCallback} callback - IntersectionObserverのオプションのコールバック関数
 * @return {IntersectionObserver} fetchが返却するPromiseオブジェクト
 */
export const createIntersectionObserver = ({
  options,
  callback
}: {
  options: IntersectionObserverInit
  callback: IntersectionObserverCallback
}) => {
  return new IntersectionObserver(callback, options)
}

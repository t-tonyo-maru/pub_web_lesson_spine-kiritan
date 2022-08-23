import keenSlider, { KeenSliderOptions } from 'keen-slider'

/**
 * keen-sliderのインスタンスを生成する関数
 * keen-slider: https://keen-slider.io/
 * keen-slider ドキュメント: https://keen-slider.io/docs
 * keen-slider サンプル: https://keen-slider.io/examples
 *
 * @param {string} el - keen-sliderマウント先のhtml要素セレクター
 * @param {KeenSliderOptions} options - keen-sliderのオプション
 * @return {KeenSliderInstance<O, P, H>} keen-sliderのインスタンス
 */
export const createKeenSlider = ({
  el,
  options = {}
}: {
  el: string
  options: KeenSliderOptions
}) => {
  return new keenSlider(el, options)
}

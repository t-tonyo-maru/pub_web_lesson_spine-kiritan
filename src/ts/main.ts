// import { createPadZero } from './module/zeroPadding/zeroPadding'

window.onload = () => {
  console.log('hello!! world!!')

  // 開発と本番のどちらの環境かを取得
  console.log(process.env.NODE_ENV) // development || production
  // 環境変数を取得
  console.log(process.env.APP_URL)
}

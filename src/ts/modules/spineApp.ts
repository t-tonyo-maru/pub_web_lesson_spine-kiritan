import * as spine from '@esotericsoftware/spine-webgl'

// https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/mix-and-match.html

export class SpineApp implements spine.SpineCanvasApp {
  private skeleton: unknown // type: spine.Skeleton
  private state: unknown // type: spine.AnimationState
  // ディスプレイのCSS解像度と物理解像度の比を取得
  private pixcelRato: number = window.devicePixelRatio || 1
  private delay: number = 8

  loadAssets = (canvas: spine.SpineCanvas) => {
    // atlas ファイルをロード
    canvas.assetManager.loadTextureAtlas('model.atlas')
    // skeleton(json 形式) をロード
    canvas.assetManager.loadJson('model.json')
  }

  initialize = (canvas: spine.SpineCanvas) => {
    // spine のアセットマネージャーを取得
    const assetManager = canvas.assetManager

    // テクスチャアトラスを生成
    const atlas = canvas.assetManager.require('model.atlas')
    // AtlasAttachmentLoader（リージョン、メッシュ、バウンディングボックス、パスのアタッチメントを解決するための要素）のインスタンスを生成
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)
    // skeleton(json 形式) を読み込むためのオブジェクトを生成
    const skeltonJson = new spine.SkeletonJson(atlasLoader)
    // skeleton 情報を読み込み
    const skeltonData = skeltonJson.readSkeletonData(
      assetManager.require('model.json')
    )
    // skeleton インスタンスを生成して、メンバにセット
    this.skeleton = new spine.Skeleton(skeltonData)

    if (this.skeleton instanceof spine.Skeleton) {
      // skeleton の大きさをセット
      this.skeleton.scaleX = 0.75 * this.pixcelRato
      this.skeleton.scaleY = 0.75 * this.pixcelRato
      // skeleton の位置を画面中央にセット
      this.skeleton.x = 0
      this.skeleton.y =
        (-1 * Math.floor(this.skeleton.data.height * 1 * this.pixcelRato)) / 2
    }

    // skeleton 情報からアニメーション情報を取得
    const stateData = new spine.AnimationStateData(skeltonData)
    // アニメーションをセット
    this.state = new spine.AnimationState(stateData)
  }

  update = (canvas: spine.SpineCanvas, delta: number) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return
    if (!(this.state instanceof spine.AnimationState)) return

    // アニメーションを更新
    this.state.update(delta)
    this.state.apply(this.skeleton)
    this.skeleton.updateWorldTransform()
  }

  render = (canvas: spine.SpineCanvas) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return

    // 画面の中心
    const center = {
      x: canvas.gl.drawingBufferWidth / this.pixcelRato / 2,
      y: canvas.gl.drawingBufferHeight / this.pixcelRato / 2
    }
    // 画面の中心・マウス位置のベクトルを算出
    const vecPositoin = {
      x: canvas.input.mouseX - center.x,
      y: canvas.input.mouseY - center.y
    }
    // ベクトルのサイズを取得
    const vecSize = Math.sqrt(vecPositoin.x ** 2 + vecPositoin.y ** 2)
    // ベクトルを正規化
    const vecNormalize = {
      x: vecPositoin.x / vecSize,
      y: vecPositoin.y / vecSize
    }

    // 目制御用ボーン
    const eyeControlBone = this.skeleton.findBone('b_eye_control')
    if (eyeControlBone !== null) {
      // x軸の更新: top-bottom: Max: 20, Min: 6
      const newX =
        eyeControlBone.x + ((canvas.input.mouseY - center.y) / 100) * -1
      if (newX > 20) {
        eyeControlBone.x = 20
      } else if (newX < 6) {
        eyeControlBone.x = 6
      } else {
        eyeControlBone.x = newX
      }
      // y軸の更新: left-right: Max: 6, Min: -6
      const newY =
        eyeControlBone.y + ((canvas.input.mouseX - center.x) / 100) * -1

      if (newY > 6) {
        eyeControlBone.y = 6
      } else if (newY < -6) {
        eyeControlBone.y = -6
      } else {
        eyeControlBone.y = newY
      }
    }

    // 顔制御用ボーン
    const faceControlBone = this.skeleton.findBone('b_tk_face_control_back')
    // 顔制御用ボーンの更新
    if (faceControlBone !== null) {
      // initial: x: 360, y: 1068

      // x軸の更新: top-bottom: Max: 450, Min: 250
      const newX =
        faceControlBone.x +
        Math.floor((canvas.input.mouseX - center.x) / this.delay)
      if (newX > 450) {
        faceControlBone.x = 450
      } else if (newX < 250) {
        faceControlBone.x = 250
      } else {
        faceControlBone.x = newX
      }

      // y軸の更新: left-right: Max: 1140, Min: 962
      const newY =
        faceControlBone.y -
        Math.floor((canvas.input.mouseY - center.y) / this.delay)
      if (newY > 1140) {
        faceControlBone.y = 1140
      } else if (newY < 962) {
        faceControlBone.y = 962
      } else {
        faceControlBone.y = newY
      }
    }

    // 体制御用ボーン
    const bodyControlBone = this.skeleton.findBone('b_tk_body_control_back')
    if (bodyControlBone !== null) {
      // initial: x: 289 y: 825

      // x軸の更新: top-bottom: Max: 360, Min: 220
      const sizeX = (360 - 220) * vecNormalize.x
      bodyControlBone.x = bodyControlBone.data.x + sizeX
      // y軸の更新: left-right: Max: 916, Min: 780
      const sizeY = (916 - 780) * vecNormalize.y
      bodyControlBone.y = bodyControlBone.data.y + sizeY * -1
    }

    // レンダラーを取得
    const renderer = canvas.renderer

    // 画面リサイズ。（ブラウザサイズが変更された時の対応）
    renderer.resize(spine.ResizeMode.Expand)
    // 画面クリア
    canvas.clear(0.2, 0.2, 0.2, 1)
    // 描画開始
    renderer.begin()
    // skeleton を描画
    renderer.drawSkeleton(this.skeleton)
    // 描画終了
    renderer.end()
  }

  error = (canvas: spine.SpineCanvas) => {
    // エラーがあれば、以降が発火する
    console.log('error!!')
    console.log(canvas)
  }
}

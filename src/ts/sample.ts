import gsap from 'gsap'
import { setWindowResizeEvent } from './module/setWindowResizeEvent/setWindowResizeEvent'
import { createKeenSlider } from './module/createKeenSlider/createKeenSlider'
import { createPixi } from './module/createPixi/createPixi'
import { createFetch } from './module/createFetch/createFetch'
import { createIntersectionObserver } from './module/createIntersectionObserver/createIntersectionObserver'
import { setRoutine } from './module/setRoutine/setRoutine'
import { createChart } from './module/createChart/createChart'

window.onload = () => {
  // Sample: windowリサイズ時の処理
  setWindowResizeEvent<() => void>({
    callback: () => console.log('windowリサイズ時のcallbackです'),
    offset: 200
  })

  // Sample: 画面縦幅100vhでの表示
  setWindowResizeEvent<() => void>({
    callback: () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      console.log(vh)
    },
    offset: 200
  })

  // Sample: keen-slider
  const keenSlider = createKeenSlider({
    el: '.keen-slider',
    options: {
      loop: true,
      created: () => {
        console.log('created')
      }
    }
  })

  // Sample: PixiJS
  const pixiWrapper = document.querySelector('.pixi') as HTMLElement
  const app = createPixi()
  pixiWrapper.appendChild(app.view)

  // Sample: chart.js
  const myChartArea = document.getElementById('myChart') as HTMLCanvasElement
  createChart({ el: myChartArea })

  // Sample: Fetch
  const getData = async () => {
    const getTodos = createFetch({
      url: 'https://jsonplaceholder.typicode.com/todos'
    })
    await getTodos()
      .then((res) => {
        if (!res.ok) {
          console.log('エラーが発生しました')
          return
        }
        res.json().then((encoded) => {
          console.log(encoded)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getData()

  // Sample: Intersection Observer
  const observer = createIntersectionObserver({
    options: {
      root: null, // nullを指定すると、ルート要素はビューポートとなる
      rootMargin: '-20px 0px', // ビューポート最下部から上部へ20px地点を交差判定域とする
      threshold: 0
    },
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Sample: gsap
          // https://greensock.com/gsap/
          gsap.to('.observerArea', {
            backgroundColor: 'yellow', // 背景色をyellowにする
            duration: 3, // 3秒間かけて行う
            ease: 'power2.inOut' // アニメーションのイージングを指定。
          })
        }
      })
    }
  })
  // 観察対象をセット
  document.querySelectorAll('.observerArea').forEach((el) => {
    observer.observe(el)
  })

  // Sample: ルーチン
  const routine = setRoutine({
    interval: 3 * 1000,
    callback: () => {
      console.log('再帰処理')
    }
  })
  // ルーチン開始
  routine.start()
  // ルーチン停止
  window.setTimeout(() => {
    routine.stop()
  }, 10 * 1000)
}

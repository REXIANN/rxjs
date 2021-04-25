const Rx = require('rxjs')
// 한번 살펴보자
// console.log(Rx)

// 어레이로부터 만들기 (from)
const deliveries = ['delivery1', 'delivery2', 'delvery3']

const stream = Rx.from(deliveries) // 여러 택배의 흐름에 대한 Observable

stream.subscribe({
  next: (data) => { console.log(data)}, // 데이터를 받았을 때의 흐름
  complete: () => {console.log('done')}, // 작업을 완료했을 때의 흐름
  error: (err) => {}, // 에러 발생시 실행
})

// 프로미스로부터 만들기(from)
function makePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('delivery')
    }, 3000)
  })
}

Rx.from(makePromise()).subscribe({
  next: data => console.log(data)
})

// 싱글 여러 데이터로부터 만들기(of)
// of 안에는 어떠한 데이터라도 넣을 수 있다
Rx.of('dev1', 'dev2', 'dev3').subscribe({
  next: data => console.log(data)
})


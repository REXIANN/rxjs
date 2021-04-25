const Rx = require('rxjs')
const { take } = require('rxjs/operators')
// 데이터의 흐름 자체를 Observable이라고 한다
const stream = Rx.interval(1000)

stream.subscribe({
  next: data => {
    console.log(data)
    // 0부터 시작한다 지금은 무한대
  }
})

// 데이터의 흐름을 물의 흐름이라고 보면 파이프를 흘러가는 물의 흐름은 파이프의 방향에 따라 바뀐다.
// 마찬가지로 파이프를 통해 데이터의 흐름을 다른 방향으로 바꾸어 줄 수 있다.

stream.pipe(
  take(10)
).subscribe({
  next: data => console.log(data)
})

// timer

stream.timer(3000, 1000) // 3초 뒤에 데이터의 흐름이 시작된다

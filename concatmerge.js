const Rx = require('rxjs')
const { take } = require('rxjs/operators')

// Question: 만든 옵저버블을 합치거나 이어붙일 수 없을까?

const stream1 = Rx.from([1, 2, 3, 4, 5])
const stream2 = Rx.from([6, 7, 8, 9, 10])

const stream3 = Rx.interval(1000).pipe(take(3))
const stream4 = Rx.interval(1000).pipe(take(3))

// concat -> 이어붙이다
Rx.concat(stream1, stream2).subscribe({
  next: data => console.log(data)
})

Rx.concat(stream3, stream4).subscribe(console.log) // console.log를 next로 바로 넣음

// merge -> 병합하다
// 두개의 스트림 데이터가 말그대로 병합이 된다. 말그래도 병렬처리이다
// 0 ---- 1 ---- 2 ---- 3 --->
// 0 ---- 1 ---- 2 ---- 3 --->

Rx.merge(stream3, stream4).subscribe(console.log)

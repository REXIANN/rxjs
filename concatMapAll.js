const Rx = require('rxjs')
const { concatMap, concatAll, take, tap } = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4])

// concat(map)

// 프로미스를 반환한다. 이것을 옵저버블로 반환해야 하므로 .from을 사용
// async function userTask(data) {
//   await openBox(data)
//   await checkBox(data)
//   await useProduct(data)
// }
//
// stream.pipe(
//   concatMap(data => Rx.from(userTask(data)))
// ).subscribe()

// concat(all)

const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream3 = Rx.of(stream1, stream2)

// stream3.subscribe(console.log) // 옵저버블들이 나온다
// Observable {
//   _isScalar: false,
//     source: Observable { _isScalar: false, _subscribe: [Function (anonymous)] },
//   operator: TakeOperator { total: 3 }
// }
// Observable {
//   _isScalar: false,
//     source: Observable { _isScalar: false, _subscribe: [Function (anonymous)] },
//   operator: TakeOperator { total: 3 }
// }

// 각 스트림이 끝날 때 마다 다음 작업을 시키고 싶을때 사용하면 된다

stream3.pipe(
  concatAll()
).subscribe()

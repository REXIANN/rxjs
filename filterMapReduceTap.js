const Rx = require('rxjs')
const { take, tap, filter, map, reduce } = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4])

// tap: 데이터는 건드리지 않고 데이터가 오면 원하는 작업을 한다
// stream.pipe(
//   tap(data => console.log('1st read: ', data)),
//   tap(data => console.log('2nd read: ', data)),
//   tap(data => console.log('3rd read: ', data))
// ).subscribe({
//   next: () => {}
// })

// filter
// stream.pipe(
//   filter(data => data > 1),
//   filter(data => data > 3)
// ).subscribe({
//   next: data => console.log(data)
// })

// map
// stream.pipe(
//   map(data => data * 2)
// ).subscribe(console.log)

// reduce
stream.pipe(
  reduce((acc, cur) => {
    return acc + cur
  })
).subscribe(console.log)

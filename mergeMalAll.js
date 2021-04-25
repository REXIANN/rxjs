const Rx = require('rxjs')
const { mergeMap, mergeAll, take, map, tap } = require('rxjs/operators')

const stream1 = Rx.interval(1000).pipe(take(3), map(data => `1st: ${data} `))
const stream2 = Rx.interval(1000).pipe(take(3), map(data => `1st: ${data} `))

const stream3 = Rx.of(stream1, stream2)

// mergeMap
stream3.pipe(
  mergeMap(data => Rx.from(userrTask(data)))
).subscribe()


// mergeAll

const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream6 = Rx.of(stream4, stream5)

stream6.pipe(
  mergeAll()
).subscribe()



const stream11 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream22 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream33 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream44 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream55 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream66 = Rx.of(stream11, stream22, stream33, stream44, stream55)

stream66.pipe(
  mergeAll(2)
).subscribe()

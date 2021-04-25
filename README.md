# RxJS 공부

## 시간의 마법사 RxJS

여러개의 비동기 작업들을 RxJS를 통해 쉽게 할 수 있다.

데이터베이스 입출력, http 요청 등이 있다. 자스 라이브러리들은 노드 런타임의 특성상 싱글 스레드로 동작하기 때문에 콜백이나 혹은 프로미스의 도움을 통해 처리가 되어 왔다. 따라서 자바스크립트의 동작 순서를 이해해야 한다.

무조건 콜백회로를 만들거나 순차적일 필요가 없는 로직들에 await을 붙여서 순차적 로직을 짜는 일이 있다. 이것은 자스의 이벤트루프의 의미가 퇴색되는 일이다.

또한 아무리 복잡하고 순서를 꼬아도 어떻게 그 작업들을 구성하고 작성해야 하는지에 대한 노하우를 배울 수 있다.

### 예시

> 3분에 한번씩 주식 거래소와 거래를 시작하되 거래를 할 때 마다 1000번의 API콜을 100개씩 1초에 한번씩 API콜을 하고 싶어.

RxJS로는 한줄로 짤 수 있다!

이 강의에서 리**액티브 프로그래밍이란 무엇인지, 또한 그 뼈대를 이루는  데이터 스트림이 무엇인지, 또 그 구현체인 옵저버블이 무엇인지** 확실하게 배울 수 있다. 어떠한 비동기 작업이 오더라도 당황하지 않고 처리할 수 있다.

위의 예시를 자스로 짰을 때

```jsx
setInterval(() => {
	if (tradeCount < 1000) {
		startTrade()
		tradeCount++
	}
}, 60 * 1000)

function startTrade() {
	let apiCallCount = 0
	setInterval(() => {
	if (tradeCount < 1000) {
		apiCall
			.then(insertToDB())
			.then(() => { apiCallCount++ })
	}
	}, 1)
}
```

추가요청이 들어온다면...?

- 한번의 주식 거래마다 5ms 간격으로 100번간격으로 호출하고 그 결과를 데이터베이스에 저장해주세요!
- 성능 문제로 API 호출을 할 때 동시에 10개씩은 동시요청이 가능하니까 10개씩 묶어서 요청해주는게 좋을 거 같아요!
- 한번 거래시마다 데이터베이스에 저장한뒤 id 값을 포함한 json파일을 만들어서 실시간으로 슬랙채널로 전달해주세요!

~~야이 ㅁㄴㅇㄹㅂㅈㄷ~~

RxJS를 사용하면 추가적인 요구사항을 반영해서도 이렇게 만들 수 있다

```jsx
function startTrade() {
	return Rx.interval(5).pipe(
		take(100),
		map(requestToApi()),
		mergaAll(10),
		mergeMap(insertToDB())
	)
}

function main() {
	Rx.interval(60 * 1000).pipe(
		mergaMap(() => startTrade()),
		mergeMap(() => sendSlack())
	)
}
```

- 복잡한 일련의 비동기 작업들을 자유롭게 처리할 수 있다.
- 가장 중요한 개념인 Observable의 개념을 명확하게 이해할 수 있다.
- Data stream객체(Observable)을 자유롭게 활용하기 위한 다양한 오퍼레이터를 알 수 있다.

## 리액티브 프로그래밍 이전의 작업

무엇이 불편했고, 어떤 니즈에 의해서 리액티브 프로그래밍이 도입되었을까?

> 리액티브 프로그래밍이랑 데이터 스트림과 변화의 전이를 통한 비동기 프로그래밍이다. (Reactive Programming is an asynchronous programming paradigm concerned with data streams and the propagation of change)

추상적인 시간 개념과 데이터의 변화 그 자체를 프로그램 내에서 가시적으로 표현할 수 있어졌다 라는 의미이다.

시계가 하나 있다고 치자. 시계는 매초 초침이 움직이고 초침이 한바퀴 돌면 분침이 한번 움직인다. 이 시계의 움직임을 변수로 만들 수 있다면 어떨까? 1초에 한번씩 초 변수를 증가시키고 60초마다 분 변수를 증가시킨다는 개념으로 생각하면 된다.

리액티브 프로그래밍에서는 시계라는 변수는 1초마다 한번씩 1초경과 라는 알림이 울리는 마법상자이다. 앞으로 1초라는 알림을 들으면 이런 작업을 하도록! 이라고 사용한다.

데이터스트림이란 데이터의 흐름 이라고 보면 된다.

## 데이터 스트림이란?

옵저버블은 데이터스트림의 구현체

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/568acc10-bf51-422e-941c-1638f7f4f543/Screen_Shot_2021-04-25_at_8.14.50_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/568acc10-bf51-422e-941c-1638f7f4f543/Screen_Shot_2021-04-25_at_8.14.50_PM.png)

시간의 흐름에 따라 데이터가 발생하는데, 시간에 따라 발생한 이벤트 스트림이 있다.

## 옵저버블이란?

Data stream이라는 추상적인 개념을 구현한 구현체이다

옵저버블을 구독함으로써 그 옵저버블에서 다양한 값들이 발생하면 이를 받아서 어떤 행동을 취한다!

옵저버블이라는 말 그대로 '관측'이 가능하다. RxJS에서는 관측 보다는 '구독'이라는 단어로 설명을 하고 있다. 특정 옵저버블을 구독함으로써 해당 이벤트를 받아 본다.

이제 vscode로 넘어감

## concatMap, concatAll

### concatMap

다음 택배를 받기 전 개봉, 검사, 사용을 하고 나서 그 다음 택배를 받고 다음 택배에서도 동일한 로직을 사용한다고 가정해보자.

한마디로 택배가 올 때마다 할 로직들(개봉, 검사, 사용)을 매핑할것이고 이 일련의 작업들을 모든 택배에 이어붙이겠다!

```jsx

const Rx = require('rxjs')
const { concatMap } = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4])

async function userTask(data) {
  await openBox(data)
  await checkBox(data)
  await useProduct(data)
}

stream.pipe(
  concatMap(data => Rx.from(userTask(data))) // 작업에 Task를 매핑한다
).subscribe()
```

map은 데이터의 흐름이 들어올때 각 데이터를 다른 옵저버블에 매핑해주는 역할을 한다!

### concatAll

all은 데이터의 흐름 자체가 또 다른 옵저버블의 흐름일때 사용한다. 옵저버블에 대한 옵저버블이라 조금 어렵게 느껴질 수도 있으니 예제를 같이 보자.

```jsx
const stream1 = Rx.interval(1000).pipe(take(3))
const stream2 = Rx.interval(1000).pipe(take(3))

const stream3 = Rx.of(stream1, stream2)

stream3.subscribe(console.log) // 옵저버블들이 나온다
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
```

각 스트림이 끝날 때 마다 다음 작업을 시키고 싶을때 사용하면 된다

## mergeMap, mergeAll

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b3a76084-e472-4d77-b854-839d47c0412a/Screen_Shot_2021-04-25_at_9.19.45_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b3a76084-e472-4d77-b854-839d47c0412a/Screen_Shot_2021-04-25_at_9.19.45_PM.png)

택배는 1초에 한개씩 오는데 택배를 개봉하고 검사하고 사용하는데 15초가 걸린다면...?

이러한 문제를 해결하기 위해 머지맵을 사용할 수 있다

### mergeMap

- 택배가 올 때마다 일련의 작업을 수행하는 것은 concat과 동일하다
- 택배는 택배대로 받고, 택배를 받으면서 모든 택배에 대해서 해당 작업을 수행을 해라!

즉, 택배를 받으면서 각 택배들이 거쳐야 하는 일련의 작업들이 동시에 실행되게 하는 것!

```jsx
const Rx = require('rxjs')
const { mergeMap, mergeAll, take, map } = require('rxjs/operators')

const stream1 = Rx.interval(1000).pipe(take(3), map(data => `1st: ${data} `))
const stream2 = Rx.interval(1000).pipe(take(3), map(data => `1st: ${data} `))

const stream3 = Rx.of(stream1, stream2)

stream3.pipe(
  mergeMap(data => Rx.from(userrTask(data)))
).subscribe()
```

concatMap은 데이터가 올 때마다 해당 데이터에 대한 작업이 될 때까지 다음 데이터를 수신하는 것을 미루고 작업을 이어간다면, mergeMap은 데이터스트림의 흐름을 방해하지 않으면서 각 비동기 작업을 동시에 실행시킨다.

### mergeAll

mergeALl은 여러개의 옵저버블을 동시에 실행시킨다

```jsx
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream6 = Rx.of(stream4, stream5)

stream6.pipe(
  mergeAll()
).subscribe()
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b873b415-fdb6-426d-a00e-0d509f08a2be/Screen_Shot_2021-04-25_at_9.31.15_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b873b415-fdb6-426d-a00e-0d509f08a2be/Screen_Shot_2021-04-25_at_9.31.15_PM.png)

일련의 작업 뭉치가 두개가 있고 각 작업들을 두개씩 묶어서 실행을 시키고 싶다면?

```jsx
const stream11 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream22 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream33 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream44 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream55 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream66 = Rx.of(stream11, stream22, stream33, stream44, stream55)

stream66.pipe(
  mergeAll(2)
).subscribe()
```

두개씩 머지해서 실행해라 라고 주면 됌!

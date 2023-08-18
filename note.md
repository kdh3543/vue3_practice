v-if vs v-show
v-if => toggle시 비용이 많이 듦 -> toggle을 잘 사용안할 때 사용
v-show => 초기 렌더링시 비용이 많이 듦(div 태그가 두개가 다 보임) - toggle이 자주 될 때 사용하는게 좋음

computed
일반 함수와 computed의 차이

1. template에서 사용시 일반 함수는 ()를 표시해야하고 computed는 값을 리턴해서 ()가 별도로 필요 없음
2. computed는 parameter 전달이 안됨
3. computed는 값을 캐쉬해서 값을 저장하고 있음

watch vs watchEffect

1. watch

- 특정 데이터의 변화를 감지해 자동으로 특정 로직을 수행(감시 대상을 지정해야 함)
- 이전값과 변경된 값을 알 수 있지만 watchEffect는 알 수 없음

2. watchEffect

- 대상을 지정하는 부분이 존재하지 않음
- effect를 지정하는 함수에서 선언된 대상들을 감시(안에 사용된 대상들의 변경을 감지하여 실행됨)
- watchEffect는 watch와 다르게 즉시 실행됨

vue-router 작동원리
처음 페이지를 모두 받아온 상태에서 원하는 페이지를 요청시 가지고 있던 페이지를 보여주기 때문에 리로딩이 일어나지 않음
router-link 대신 a를 사용하면 리로딩하면서 새로 html과 js를 받아와서 처리함
spa 사용시 처음 로딩은 오래걸리지만 다음 로딩부터는 빠르게 처리 가능

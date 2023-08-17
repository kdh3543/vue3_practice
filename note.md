v-if vs v-show
v-if => toggle시 비용이 많이 듦 -> toggle을 잘 사용안할 때 사용
v-show => 초기 렌더링시 비용이 많이 듦(div 태그가 두개가 다 보임) - toggle이 자주 될 때 사용하는게 좋음

computed
일반 함수와 computed의 차이
1. template에서 사용시 일반 함수는 ()를 표시해야하고 computed는 값을 리턴해서 ()가 별도로 필요 없음
2. computed는 parameter 전달이 안됨
3. computed는 값을 캐쉬해서 값을 저장하고 있음


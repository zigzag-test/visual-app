# Visual App

- 주어진 데이터를 이용해 그래프와 테이블을 출력하는 어플리케이션입니다.

실행: `yarn install && yarn start`

create-react-app으로 구현했으며, 차트 라이브러리는 `d3.js`를 사용했습니다.

1. 그래프
전체 데이터 / ios 사용자 필터 / 안드로이드 사용자 필터 이렇게 세 가지로 데이터를 구분한 뒤,
각 데이터의 접속자를 1시간 단위로 묶어 차트 데이터를 확보했습니다.
이때 `lodash`의 `groupBy` 함수를 사용했습니다.

또 기준 시간에 따른 데이터 선별을 위해 `dropWhile` 함수를 사용했습니다.

그러나 아직 기준 시간을 자유자재로 바꾸는 기능까진 만들지 못했습니다.

2. 테이블
따로 라이브러리를 사용하진 않았습니다.

기존 데이터를 테이블 용 데이터로 재가공해 렌더링했고, 시간을 나타낼 때는 `moment.js`라는 라이브러리를 사용했습니다.

3. 본인 피드백
가독성 있는 코드를 만들기 위해 각 변수에 어휘적인 이름을 부여했지만, 데이터를 가공하는 과정에서
변수들이 너무 많이 만들어져서 오히려 코드가 난삽해보인다는 느낌이 들었습니다.

`d3.js`를 사용할 때, react와 충돌할 것을 염두에 두어서, 차트의 배경 같은 정적인 요소는 react를
이용해 구현하고, 축이나 라인 같은 동적인 요소는 `d3`로 구현했습니다. 또 불필요한 재 렌더링을 방지하기 위해
`PureComponent`를 사용했습니다.

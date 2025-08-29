<template>
    <!-- 단방향 바인딩; 새로고침 하지 않아도 값이 실시간으로 변경 -->
    <!-- 화면 내에서는 this를 붙일 필요 없음 -->
    <h1>hello world {{language}}</h1>
    <!-- v-model 문법을 사용하면 양방향 데이터 바인딩 -->
    <input type="text" v-model="value">
    <button @click="changeValue()">변수 변경</button>
    <button @click="showValue()">변수 확인</button>

</template>
<script>
    export default {
        // data() 함수는 화면에서 사용할 변수들을 정의
        data() {
            return {
                language: "java"
                , value: "java"
                ,
            }
        }
        
        // 개발자가 정의하는 함수는 methods 안에 정의
        , methods: {
            changeValue() {
                // this의 의미는 현재 컴포넌트 객체 자신을 의미
                // this는 주로 컴포넌트 내부에 선언된 변수(data 함수 내)에 접근할 때 주로 사용
                // data 함수 내에 접근할 때는 this, 사용자 정의 함수의 매개변수를 접근할 때는 this X
                this.language = this.value;
                // 함수 내에서 다른 함수를 호출할 때도 this.함수 (화면 내에서 다른 함수이기 때문)
                // this 붙이지 않으면 컴파일 에러
                // this.showValue()
            }
            , showValue() {
                alert(this.value);
            }
        }
        
    }
</script>
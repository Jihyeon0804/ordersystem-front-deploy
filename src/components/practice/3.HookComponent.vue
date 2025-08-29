<template>
    <h2>hook test</h2>
    <button @click="moveScreen()">다른 화면으로 화면 이동</button>
    <h1>{{count1}}</h1>
    <button @click="incrementCount()">count1 증가</button>
    <!-- computed를 통해 계산된 함수의 결과 값은 함수명 그대로 변수처럼 사용 가능 -->
    <h1>computed된 값 : {{doubleCount}}</h1>
</template>

<script>
    export default {
        data() {
            return {
                count1: 0
                ,
            }
        }
        // 화면이 열리기 전(vue 인스턴스가 생성되기 전) 실행되는 함수
        // 예시) 목록 조회, 상세 조회 등
        // , created() {
        //     alert("created test");
        // }

        // 컴포넌트가 화면 상에서 제거될 때 실행되는 함수(라우트 이동 시 실행)
        // 예시) 채팅 화면을 벗어나 다른 화면으로 이동 시에 실시간 연결 종료
        // 예시) 사용자가 서버에서 나갈 시 실시간 연결 종료 (unsubscribe 요청 전송)
        , beforeUnmount() {
            alert("화면 종료");
            // axios.get("localhost:8080/sse/disconnect")
        }

        // 종속된 데이터가 변경될 때 함수를 다시 실행하여 값을 계산해서 "리턴"하는 함수
        , computed: {
            // this.count1을 바라보고 있다가 값이 변경되면 doubleCount() 값이 변하는 로직
            // doubleCount() 는 함수이지만 변수처럼 사용 가능
            // 예시) 장바구니 수량 보여줄 때 (주로 상태 관리랑 같이 적용)
            doubleCount() {
                return this.count1 * 2;
            }
        }

        // 특정 변수 값의 변경 사항을 인지하여 "함수를 실행"하는 hook함수
        // 예시) 검색어 입력 시 자동 API 호출 (검색창에 검색어 입력하면 밑에 관련 검색어 나오는 것)
        , watch: {
            // 인지하고자 하는 변수 값과 일치되는 함수 명을 사용
            count1() {
                alert("watch 함수 실행");
            }
        }

        // 화면 전체의 변경 사항을 인지하는 hook 함수
        , updated() {
            alert("updated 함수 호출")
        }
        
        , methods: {
            moveScreen() {
                this.$router.push("/practice/vuetify");
            }
            , incrementCount() {
                this.count1++;
            }
        }
    }
</script>
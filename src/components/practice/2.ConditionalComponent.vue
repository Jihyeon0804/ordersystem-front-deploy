<template>
    <h1>vue 조건식</h1>

    <button v-if="!isLogined" @click="login()">로그인 버튼</button>
    <button v-if="isLogined" @click="logout()">로그아웃 버튼</button>
    <div v-if="!isLogined">로그인 해주세요</div>
    <div v-if="isLogined">환영합니다</div>


    <h1>vue 반복문</h1>
    <h2>상품 목록 조회</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>상품명</th>
                <th>상품 가격</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in productList" :key="p.id">
                <td>{{p.id}}</td>
                <td>{{p.name}}</td>
                <td>{{p.price}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import axios from 'axios';

    export default {
        data() {
            return {
                isLogined: false
                // , productList: [{id : 1, name : "사과", price : 3000}
                //                 , {id : 2, name : "바나나", price : 2000}
                //                 , {id : 3, name : "수박", price : 5000}
                //             ]
                // ,
                
                // 서버에서 받아오기
                , productList: []
                ,
            }
        },
        // 사전에 정의되어 있는 함수
        // 화면이 열림과 동시에 실행되는 hook 함수 : created()
        async created() {
            // axios 사용 시 에러 발생할 수 있기 때문에 반드시 try - catch로 예외 처리 해주기
            const response = await axios.get("http://localhost:8080/product/list");
            console.log(response);
            // data. 뒤에 부터는 서버에서 응답이 온 데이터의 변수명
            this.productList = response.data.result.content;
        }
        , methods: {
            login() {
                this.isLogined = true;
            }
            , logout() {
                this.isLogined = false;
            }
        }
        
    }
</script>
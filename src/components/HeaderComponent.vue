<template>
    <!-- 상단 헤더를 꾸밀 때 사용 태그 -->
    <v-app-bar>
        <v-container>
            <v-row>
                <!-- justify-start : 왼쪽 기준 정렬 -->
                <v-col class="d-flex justify-start">
                    <div v-if="userRole === 'ADMIN'">
                        <v-btn :to="'/member/list'">회원 관리</v-btn>
                        <v-btn :to="'/product/manage'">상품 관리</v-btn>
                        <v-btn href="'/order/list'">실시간 주문 건수 {{ liveOrderCount }}</v-btn>
                        <!-- <v-btn :to="'/practice/store'">스토어 테스트</v-btn> -->
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="'/'">devops shop</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn :to="'/product/list'">상품목록</v-btn>
                    <v-btn v-if="isLogined" :to="'/order/cart'">장바구니 {{totalQuantity}}</v-btn>
                    <v-btn v-if="isLogined" :to="'/member/myPage'">마이페이지</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/login'">로그인</v-btn>
                    <v-btn v-if="isLogined" @click="doLogout()">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';


    export default {
        data() {
            return {
                userRole: null
                , isLogined: false
                , cartProductCount : 0
                , liveOrderCount : 0
                ,
            }
        }
        , created() {
            // jwt 토큰에 payload 에 role, email 이 포함되도록 설계했으므로,
            // 토큰에서 role 을 꺼내 역할 분리
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                // jwt 토큰 파싱
                const payload = jwtDecode(accessToken);
                this.userRole = payload.role;
                console.log(payload);
                this.isLogined = true;
            }

            // sse 연결 및 메세지 수신
            // role이 admin인 경우 connect 요청
            if (this.userRole === 'ADMIN') {
                // sse 연결 요청을 위한 event-source-polyfill 라이브러리 사용
                // main.js 에서 axios 요청인 경우 intercept 해서 token 세팅했는데, 해당 요청은 axios 아니라서 직접 token 세팅
                let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // sse.addEventListener('이벤트명')
                sse.addEventListener('connect', (event) => {
                    console.log(event);
                })

                sse.addEventListener('ordered', (event) => {
                    // event 에 메세지 담겨있음
                    console.log(event);
                    this.liveOrderCount++;
                })
            }
        }
        , computed: {
            totalQuantity () {
                return this.$store.getters.getTotalQuantity;
            }
        }
        , methods: {
            doLogout() {
                localStorage.clear();
                // window.location.reload();

                // spa 방식으로 이동하는 경우 this.isLogined = false로 같이 바꾸어 주어야 함
                this.isLogined = false;
                this.userRole = null;
                this.$router.push("/");
            }
        }
    }
</script>
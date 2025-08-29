<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원가입
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="name"
                                label="이름"
                                type="text"
                                prepend-icon="mdi-account"
                            />
                            <v-text-field
                                v-model="email"
                                label="이메일"
                                type="email"
                                prepend-icon="mdi-email"
                            />
                            <v-text-field
                                v-model="password"
                                label="비밀번호"
                                type="password"
                                prepend-icon="mdi-lock"
                            />
                            <v-row>
                                <v-col>
                                    <!-- block은 속한 row에서 너비를 꽉 채움 -->
                                    <v-btn color="primary" block @click="memberCreate()">
                                        가입하기
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getErrorMessage } from '@/utils/commonDataHandler';
import axios from 'axios';

    export default {
        data() {
            return {
                name : null
                ,
                email : null
                ,
                password : null
                ,
            }
        }
        , methods: {
            async memberCreate() {
                try {
                    // data 객체의 key 값은 dto의 필드명이랑 일치해야 함
                    // 서버에서 json 형태를 요구하기 때문에 객체로 조립 (axios 가 json 형태로 자동 변환)
                    const data = {name : this.name, email : this.email, password : this.password}
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, data)
                    this.$router.push("/");
                    // 아래와 같이 결과를 받아올 수 없음
                    // axios 부터 에러가 발생하면 response 로 받아올 수 없기 때문에 response가 undefined로 정의됨
                    // 그럼 response.data.status_message 도 마찬가지로 에러
                    // const response = await axios.post("http://localhost:8080/member/create", data)
                    // alert(response.data.status_message)
                } catch(e) {
                    console.log(e)
                    // alert(e.response.data.status_message);
                    // utils 에 있는 함수 호출
                    alert(getErrorMessage(e));
                }
            }
        }
    }
</script>
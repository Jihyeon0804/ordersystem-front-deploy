<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        {{ pageTitle }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody>
                                <tr>
                                    <td>ID : </td>
                                    <td>{{member.id}}</td>
                                </tr>
                                <tr>
                                    <td>이름 : </td>
                                    <td>{{member.name}}</td>
                                </tr>
                                <tr>
                                    <td>이메일 : </td>
                                    <td>{{member.email}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';

export default {
    // 화면 간에 매개 변수를 넘길 때 사용하는 변수 값을 props 라 칭함
    props: ['isMyPage', 'pageTitle']
    , data() {
        return {
            member : {}
        }
    }
    
    , async created() {
        try {
            if (this.isMyPage) {
                // main.js 에 토큰 설정했으므로 토큰 포함해서 요청 보낼 필요 없음
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myPage`)
                this.member = getResultData(response);

            } else {
                const id = this.$route.params.memberId;
                // main.js 에 토큰 설정했으므로 토큰 포함해서 요청 보낼 필요 없음
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/detail/${id}`)
                this.member = getResultData(response);
            }
            
            
        } catch (e) {
            console.log(e)
        }
    }
}
</script>
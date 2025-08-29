<template>
    <v-container>
        <v-row class="d-flext justify-content-between mt-5">
            <v-col>
                <v-form>
                    <v-row>
                        <v-col cols="auto">
                            <v-select
                            v-model="searchType"
                            :items="searchOptions"
                            item-title = "text"
                            item-value = "value"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                            v-model="searchValue"
                            label="search"
                            @keyup.enter="searchProduct"
                            />
                        </v-col>
                        <v-col cols="auto">
                            <v-btn @click="searchProduct()">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                <v-btn @click="addCart()" color="primary">장바구니</v-btn>
                <v-btn @click="createOrder()" color="secondary">주문하기</v-btn>
            </v-col>
            <v-col cols="auto" v-if="isAdmin">
                <v-btn :to="'/product/create'" color="primary">상품 등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        {{ pageTitle }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>상품 사진</th>
                                    <th>상품명</th>
                                    <th>가격</th>
                                    <th>재고 수량</th>
                                    <th v-if="!isAdmin">주문 수량</th>
                                    <th v-if="!isAdmin">주문 선택</th>
                                    <th v-if="isAdmin">상품 수정</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productList" :key="product.id">
                                    <td>
                                        <v-img :src="product.imagePath"></v-img>
                                    </td>
                                    <td>{{product.name}}</td>
                                    <td>{{product.price}}</td>
                                    <td>{{product.stockQuantity}}</td>
                                    <td v-if="!isAdmin">
                                        <!-- input 박스는 화면에서 숫자처럼 보여도 실제 입력값은 문자열 -->
                                        <!-- v-model.number를 통해 v-model에 입력된 값을 형변환 -->
                                        <v-text-field
                                        v-model.number="product.productCount"
                                        type="number"
                                        style="width: 65px;"
                                        />
                                    </td>
                                    <td v-if="!isAdmin">
                                        <input type="checkbox" v-model="product.selected">
                                        <!-- <input type="checkbox" v-model="selected[product.id]"> -->
                                    </td>
                                    <td v-if="isAdmin">
                                        <v-btn color="secondary">상품 삭제</v-btn>
                                    </td>
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
import axios from 'axios';

    export default {
        props : ['isAdmin', 'pageTitle']
        , data() {
            return {
                productList : []
                // 선택된 값이 true가 key : value 형태로 담김
                // 선택한 id가 1이라면 selected : {1 : true}
                // , selected : {}
                , pageSize : 7
                , currentPage : 0
                , isLoading : false
                , isLastPage : false
                , searchType : "Optional"    // 초기값을 선택으로 지정
                , searchValue : ""
                , searchOptions : [
                    {text : "선택", value : "Optional"}
                    ,{text : "상품명", value : "productName"}
                    , {text : "카테고리", value : "category"}
                ]
                ,
            }
        }
        , async created() {
            this.loadData();
            window.addEventListener('scroll', this.scrollPaging);
        }
        , methods: {
            addCart() {
                const orderDataList = this.productList
                                        .filter(p => p.selected && p.productCount > 0)
                                        .map(p => ({
                                            productId : p.id
                                            , name : p.name
                                            , productCount : p.productCount
                                        }));
                
                orderDataList.forEach(p => this.$store.dispatch("addCart", p))
                
            }
            , searchProduct() {

                this.productList = [];
                this.currentPage = 0;
                this.isLastPage = false;
                this.isLoading = false;
                this.loadData();
            }
            , scrollPaging() {
                // 현재 화면 높이 + 스크롤로 이동한 거리 > 전체 화면 높이 - N(내가 원하는 길이) 가 성립되면 추가 데이터 로드
                const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
                if (isBottom && !this.isLoading && !this.isLastPage) {
                    this.loadData();
                }
            }
            , async loadData() {
                // 스크롤 페이징 시 로드 중일 때 데이터 가져오는 게 꼬이기 때문
                this.isLoading = true;

                // 문자열로 직접 ?size=xx&page=yy&productName=ee&&category=zz 형태로도 조립 가능하지만, params 라는 객체를 사용하면 파라미터 형식으로 url 조립 가능
                // params 는 약속된 이름임
                let params = {
                    size : this.pageSize
                    , page : this.currentPage
                    ,
                }

                if (this.searchType == "productName") {
                    params.productName = this.searchValue;
                }
                if (this.searchType == "category") {
                    params.category = this.searchValue;
                }
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
                const additionalData = response.data.result.content
                                        .map(p => ({...p, productCount : 0, selected : false}));

                // 더이상 받아올 데이터가 없는 경우
                if (additionalData.length == 0) {
                    this.isLastPage = true;
                }
                // 기존의 productList 에 productCount 추가 (0으로 세팅)
                // this.productList = response.data.result.content.map(p => ({...p, productCount : 0}));
                this.productList = [...this.productList, ...additionalData];

                // 현재 페이지 늘려주기
                this.currentPage++;

                // 페이지 로드 끝나면 다시 false
                this.isLoading = false;
            }
           ,  async createOrder() {
                try {
                    // const orderData = this.productList
                    //                 .filter(product => this.selected[product.id] && product.productCount > 0)
                    //                 .map(product => ({
                    //                     productId : product.id
                    //                     , productCount : product.productCount
                    //                 }));

                    // productList에 selected : false 추가
                    const orderDataList = this.productList
                                        .filter(p => p.selected && p.productCount > 0)
                                        .map(p => ({
                                            productId : p.id
                                            , productCount : p.productCount
                                        }));
                    // console.log(orderData);
                    console.log(orderDataList);

                    if (orderDataList.length > 0) {
                        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderDataList);
                        alert("주문이 완료되었습니다.")
                        // 주문 완료 후 새로고침
                        window.location.reload();
                    }
                    
                } catch (e) {
                    console.log(e);
                    alert("주문 실패했습니당.")
                }
            }
        }
    }
</script>
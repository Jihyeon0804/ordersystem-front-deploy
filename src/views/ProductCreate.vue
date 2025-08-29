<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        상품 등록
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="name"
                                label="상품명"
                            />
                            <v-text-field
                                v-model="category"
                                label="카테고리"
                            />
                            <v-text-field
                                v-model.number="price"
                                label="가격"
                            />
                            <v-text-field
                                v-model.number="stockQuantity"
                                label="재고수량"
                            />
                            <!-- @change : v-file-input 태그에서 변경 발생 시 해당 이벤트 함수 자동 호출 -->
                            <v-file-input
                            label="상품이미지"
                            accept="image/**"
                            @change="fileUpload"
                            multiple
                            />
                            <v-row>
                                <v-col>
                                    <!-- block은 속한 row에서 너비를 꽉 채움 -->
                                    <v-btn color="primary" block @click="productCreate()">
                                        등록하기
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
import axios from 'axios';

    export default {
        data() {
            return {
                name : ""
                , category : ""
                , price : null
                , stockQuantity : null
                , productImage : null           // 파일이 여러 개인 경우는 배열로 설정
                , 
            }
        }
        , methods: {
            // event에 파일이 주입
            fileUpload(event) {
                // 여러 개의 상품일 경우 for문을 실행하여 각 productImage에 값 할당
                this.productImage = event.target.files[0];      // 단건일 경우
                console.log(this.productImage);

            }
            , async productCreate() {
                try {
                    // form-data의 형식으로 객체 생성
                    // multi-part-formData 또는 url 인코딩 방식인 경우에 FormData 클래스 사용해서 객체 조립
                    let data = new FormData();

                    data.append("name", this.name);
                    data.append("category", this.category);
                    data.append("price", this.price);
                    data.append("stockQuantity", this.stockQuantity);
                    data.append("productImage", this.productImage);

                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, data);
                    this.$router.push("/product/manage")
                } catch(e) {
                    console.log(e);
                }
            }
        }
    }
</script>
<template>
    <h2>store component B</h2>
    <p>지역 변수값 count : {{ count }}</p>
    <p>전역 store 변수 값 count : {{ getStoreCount }}</p>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
                ,
            }
        }
        , computed: {
            getStoreCount() {
                return this.$store.getters.getCount;
            }
        }
    }
</script>
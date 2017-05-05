<template>
    <div class="seller-score">
        <span v-for="item in itemClass" :class="item"></span>
    </div>
</template>
<script>
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        name: 'score',
        props: ['score'],
        created: function () {
        },
        computed: {
            itemClass () {
                let result = [];
                let score = this.score;
                let len = Math.floor(score.score * 2) / 2;
                let integer = Math.floor(score.score);

                let isInteger = len % 1 !== 0;
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (isInteger) {
                    result.push(CLS_HALF);
                }
                while (result.length < score.len) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }

    };
</script>
<style lang="less">
    .seller-score{
        text-align: center;
        span{
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 12px;
            background-size: 100%;
            &.on{
                background-image: url('./star24_on@2x.png');
            }
            &.half{
                background-image: url('./star24_half@2x.png');
            }
            &.off{
                background-image: url('./star24_off@2x.png');
            }
        }
    }
</style>

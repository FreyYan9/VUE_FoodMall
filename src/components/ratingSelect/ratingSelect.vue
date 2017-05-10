<template>
    <div class="ratings-select">
        <div class="top  line">
            <div @click='select(2)' :class='{active: selectType == 2}' class="rating-type">全部 {{ ratings.length }}</div>
            <div @click='select(0)' :class='{active: selectType == 0}' class="rating-type">满意 {{ positives.length }}</div>
            <div @click='select(1)' :class='{active: selectType == 1}' class="rating-type">不满意 {{ negatives.length }}</div>
        </div>
        <div class="bottom" @click='getContent'>
            <span class="icon-check_circle icon-is-null" :class='{on:isContent}'></span>
            <span class="title">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ratingSelect',
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            isContent: true,
            selectType: 2
        };
    },
    methods: {
        getContent() {
            if (event._constructed) {
                this.isContent = !this.isContent;
                window.EM.$emit('checked', this.isContent);
            };
        },
        select(type) {
            if (event._constructed) {
                this.selectType = type;
                window.EM.$emit('select', type);
            };
        }
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === 0;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === 1;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.ratings-select {
    .top,
    .bottom {
        margin: 0 18px;
        padding: 18px 0;
    }
    .top {
        .rating-type {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color: #4d555d;
            background: rgba(0, 160, 220, 0.2);
            &.active {
                color: #fff;
                background: #00a0dc;
            }
            &:last-child {
                background-color: rgba(77, 85, 93, 0.2);
                &.active {
                    color: #fff;
                    background: #4d555d;
                }
            }
        }
    }
    .bottom {
        padding: 12px 18px 12px 0px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: #93999f;
        font-size: 0;
        span {
            display: inline-block;
            &.icon-is-null {
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
            }
            &.title {
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
            &.on {
                color: #00c850;
            }
        }
    }
}
</style>
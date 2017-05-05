<template>
    <div class="ratings-select">
        <div class="top  line">
            <div class="rating-type active">全部 24</div>
            <div class="rating-type">满意 18</div>
            <div class="rating-type">不满意 6</div>
        </div>
        <div class="bottom">
            <span class="icon-check_circle icon-is-null"></span>
            <span class="title">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ratingSelect',
    data() {
        return {};
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
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: #93999f;
        font-size: 0;
        span {
            display: inline-block;
            .icon-is-null {
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
            }
            .title {
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
}
</style>

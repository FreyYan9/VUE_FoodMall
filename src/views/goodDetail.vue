<template>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
        <div v-show="showFlag" class="detail-wrapper" ref='detailBS'>
            <div class="detail-content">
                <div class="good-img">
                    <img :src="good.image" alt="">
                    <div @click="hide" class="back">
                        <i class='icon-arrow_lift'></i>
                    </div>
                </div>
                <div class="good-content">
                    <h1 class="title">{{ good.name }}</h1>
                    <div class="seller">
                        <span>月售{{ good.sellCount }}份</span><span>好评率{{ good.rating }}%</span>
                    </div>
                    <div class="price">
                        <span>¥ {{ good.price }}</span>
                        <s v-show="good.oldPrice">¥ {{ good.oldPrice }}</s>
                    </div>
                </div>
                <split v-show="good.info"></split>
                <div v-show="good.info" class="info">
                    <h1 class="title">商品信息</h1>
                    <span>{{ good.info }}</span>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingSelect @select="seleteRate"></ratingSelect>
                    <div class="content-wrapper">
                        <ul>
                            <li v-show="changeRating(item)" v-for="item in good.ratings" class="line">
                                <div class="top">
                                    <div class="time">
                                        {{ item.rateTime | formatDate }}
                                    </div>
                                    <div class="user">
                                        <span class="name">{{ item.username }}</span>
                                        <img :src="item.avatar" alt="">
                                    </div>
                                </div>
                                <div class="bottom">
                                    <span :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType===1}"></span> {{ item.text }}
                                </div>
                            </li>
                        </ul>
                        <!--  <div class="no-rating">
                            暂无评价
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import split from 'com/split/split';
import IScroll from 'better-scroll';
import ratingSelect from 'com/ratingSelect/ratingSelect';
import {
    formatDate
} from 'common/js/date';
// import Vue from 'vue';

const ALL = 2;

export default {
    name: 'GoodDetail',
    props: {
        good: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL
        };
    },
    // mounted() {
    //     window.EM.$on('changeSelect', function(data) {
    //         this.selectType = data;
    //         console.log(data);
    //     });
    // },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = ALL;
            this.$nextTick(() => {
                if (!this.detailScorll) {
                    this.detailScorll = new IScroll(this.$refs.detailBS, {
                        click: true
                    });
                } else {
                    this.detailScorll.refresh();
                };
            });
        },
        hide() {
            this.showFlag = false;
        },
        changeRating(data) {
            if (this.selectType === ALL) {
                return true;
            }
            if (data.rateType === this.selectType) {
                return true;
            }
            return false;
        },
        seleteRate(data) {
            this.selectType = data;
        }
    },
    components: {
        split,
        ratingSelect
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
};
</script>
<style lang='less' scoped>
.detail-wrapper {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;
    font-weight: normal;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
    .detail-content {
        .good-img {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
        .back {
            position: absolute;
            top: 10px;
            left: 10px;
            color: #fff;
            font-size: 18px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 15px;
            background-color: #000;
            opacity: .8;
            i {
                line-height: 30px;
            }
        }
        .good-content {
            position: relative;
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: #07111b;
            }
            .seller {
                margin-bottom: 18px;
                line-height: 10px;
                height: 10px;
                font-size: 0;
                span {
                    font-size: 12px;
                    &:first-child {
                        margin-right: 8px;
                    }
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                span {
                    color: red;
                    margin-right: 8px;
                }
                s {
                    font-size: 12px;
                }
            }
        }
        .info {
            padding: 18px;
            h1 {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: #07111b;
            }
            span {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: #4d555d;
            }
        }
        .rating {
            padding-top: 18px;
            h1 {
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: #07111b;
            }
            .content-wrapper {
                padding: 0 18px;
                li {
                    padding: 16px 0;
                    .top {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 6px;
                        .time {
                            line-height: 12px;
                            font-size: 10px;
                            color: #93999f;
                            vertical-align: top;
                        }
                        .user {
                            line-height: 12px;
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                            font-size: 10px;
                            color: #93999f;
                            img {
                                width: 12px;
                                height: 12px;
                                border-radius: 50%;
                            }
                        }
                    }
                    .bottom {
                        line-height: 16px;
                        font-size: 12px;
                        color: #07111b;
                        .icon-thumb_up {
                            color: #00a0dc;
                        }
                        .icon-thumb_down {
                            color: #93999f;
                        }
                    }
                }
            }
        }
    }
}
</style>

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
                <split></split>
                <div v-show="good.info" class="info">
                    <h1 class="title">商品信息</h1>
                    <span>{{ good.info }}</span>
                </div>
                <div v-show="good.info" class="info">
                    <h1 class="title">商品信息</h1>
                    <span>{{ good.info }}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import split from 'com/split/split';
import IScroll from 'better-scroll';

export default {
    name: 'GoodDetail',
    props: {
        good: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        show() {
            this.showFlag = true;
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
        }
    },
    components: {
        split
    }
};
</script>
<style lang='less' scoped>
.detail-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    /*height: 300px;*/
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
    }
}
</style>
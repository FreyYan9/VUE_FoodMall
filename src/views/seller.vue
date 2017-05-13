<template>
    <div id="seller" ref="sellerS">
        <div class="seller-wrapper">
            <div class="overview">
                <h1 class="name">{{ seller.name }}</h1>
                <div class="score-wrapper line">
                    <score :score="score"></score>
                    <span class="text">({{ seller.ratingCount }})</span>
                    <span class="text">月售{{ seller.sellCount }}单</span>
                </div>
                <div class="favorite" @click="favorite">
                    <span class='icon-favorite' :class='{"on": isFavorite}'></span>
                    <span>{{ facoriteText }}</span>
                </div>
                <ul class="desc">
                    <li class="block">
                        <h2>起送价</h2>
                        <span class="title">{{ seller.minPrice }}</span>元
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <span class="title">{{ seller.deliveryPrice }}</span>元
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <span class="title">{{ seller.deliveryTime }}</span>分钟
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">
                    公告与活动
                </h1>
                <div class="content">
                    {{ seller.bulletin }}
                </div>
                <ul class="seller-prefer" v-if="seller.supports">
                    <li v-for="item in seller.supports">
                        <span :class="classMap[item.type]"></span>
                        <span>{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref='picS'>
                    <ul class="pic-list" ref='picList'>
                        <li class="pic-item" v-for='img in seller.pics'>
                            <img @click="show(img)" :src="img" alt=""></li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item line" v-for="info in seller.infos">{{ info }}</li>
                </ul>
            </div>
        </div>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <showImage v-show="isShowImage" :images="imageSrc"></showImage>
        </transition>
    </div>
</template>
<script>
import IScroll from 'better-scroll';

import score from 'com/score/score';
import split from 'com/split/split';
import showImage from 'com/showImage/showImage';

export default {
    name: 'Seller',
    data() {
        return {
            seller: {},
            score: {
                len: 5,
                score: 0
            },
            isFavorite: false,
            isShowImage: false,
            imageSrc: ''
        };
    },
    created() {
        this.$http.get('/api/seller').then((res) => {
            if (res.body.erron === 0) {
                this.seller = res.body.data;
                this.score.score = this.seller.score;
            };
        });
        // 公告图片
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
        'seller' () {
            this.$nextTick(() => {
                this._initScroll();
                this._initPics();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
            this._initPics();
        });
        window.EM.$on('hideImg', () => {
            this.isShowImage = false;
        });
    },
    methods: {
        _initScroll() {
            if (!this.sellerScroll) {
                this.sellerScroll = new IScroll(this.$refs.sellerS, {
                    click: true
                });
            } else {
                this.sellerScroll.refresh();
            };
        },
        _initPics() {
            if (this.seller.pics) {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picList.style.width = width + 'px';
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new IScroll(this.$refs.picS, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                });
            }
        },
        favorite() {
            if (event._constructed) {
                this.isFavorite = !this.isFavorite;
            }
        },
        show(src) {
            this.isShowImage = true;
            this.imageSrc = src;
        }
    },
    computed: {
        facoriteText() {
            return this.isFavorite ? '已收藏' : '收藏';
        }
    },
    components: {
        score,
        split,
        showImage
    }
};
</script>
<style lang="less">
#seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        position: relative;
        padding: 18px;
        .name {
            margin-bottom: 8px;
            line-height: 14px;
            color: #07111b;
            font-size: 14px;
        }
        .score-wrapper {
            padding-bottom: 18px;
            position: relative;
            font-size: 0;
            .seller-score {
                display: inline-block;
                margin-right: 8px;
                vertical-align: top;
                span {
                    width: 14px;
                    height: 14px;
                    margin-right: 6px;
                }
            }
            .text {
                display: inline-block;
                margin-right: 12px;
                line-height: 18px;
                vertical-align: top;
                font-size: 10px;
                color: #4d555d;
            }
        }
        .favorite {
            position: absolute;
            width: 50px;
            right: 11px;
            top: 18px;
            text-align: center;
            span {
                &:first-child {
                    display: block;
                    margin-bottom: 4px;
                    line-height: 24px;
                    font-size: 24px;
                    color: #d4d6d9;
                }
                &:last-child {
                    line-height: 10px;
                    font-size: 10px;
                    color: #4d555d;
                }
                &.on {
                    color: red;
                }
            }
        }
        .desc {
            display: flex;
            padding-top: 18px;
            font-size: 10px;
            h2 {
                margin-bottom: 4px;
                line-height: 10px;
                color: #93999f;
            }
            .block {
                flex: 1;
                text-align: center;
                line-height: 24px;
                color: #07111b;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                }
                .title {
                    font-size: 24px;
                }
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: #07111b;
            font-size: 14px;
        }
        .content {
            padding: 0 12px 16px 12px;
            position: relative;
            line-height: 24px;
            font-size: 12px;
            color: #f01414;
        }
        .seller-prefer {
            width: 100%;
            margin: 0 auto;
            li {
                padding: 0 12px;
                margin-bottom: 12px;
                span {
                    display: inline-block;
                    line-height: 16px;
                    font-size: 12px;
                    font-family: monospace;
                    &:first-child {
                        width: 16px;
                        height: 16px;
                        margin-right: 6px;
                        background-size: 100%;
                        vertical-align: middle;
                        &.decrease {
                            background-image: url('../../static/img/goods/decrease_1@2x.png');
                        }
                        &.discount {
                            background-image: url('../../static/img/goods/discount_1@2x.png');
                        }
                        &.guarantee {
                            background-image: url('../../static/img/goods/guarantee_1@2x.png');
                        }
                        &.invoice {
                            background-image: url('../../static/img/goods/invoice_1@2x.png');
                        }
                        &.special {
                            background-image: url('../../static/img/goods/special_1@2x.png');
                        }
                    }
                }
            }
        }
    }
    .pics {
        padding: 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            color: #07111b;
            font-size: 14px;
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
        }
        .pic-list {
            font-size: 0px;
        }
        .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .info {
        padding: 18px;
        .title {
            padding-bottom: 12px;
            line-height: 14px;
            position: relative;
            font-size: 14px;
        }
        .info-item {
            padding: 16px 12px;
            line-height: 16px;
            position: relative;
            font-size: 12px;
            &:last-child::after {
                border: none;
            }
        }
    }
}
</style>

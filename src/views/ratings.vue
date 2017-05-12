<template>
    <div id="ratings" ref="ratingsS">
        <div class="ratings-wrapper">
            <div class="ratings-score">
                <div class="left">
                    <div class="score">{{ seller.score }}</div>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <div class="star">
                            <score :score='sellerScore'></score>
                        </div>
                        <span class="score">{{ sellerScore.score }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <div class="star">
                            <score :score='goodScore'></score>
                        </div>
                        <span class="score">{{ goodScore.score }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="time">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="ratings-selete-hook">
                <rating-select :ratings="ratings"></rating-select>
            </div>
            <ul class="comment-list">
                <li class="comment-item line" v-show="changeRating(rating)" v-for='rating in ratings'>
                    <div class="avatar">
                        <img :src="rating.avatar" alt="">
                    </div>
                    <div class="content">
                        <h1 class="name">{{ rating.username }}</h1>
                        <div class="star-wrapper">
                            <score :score="{len:5, score: rating.score}"></score>
                            <div class="dtime">{{ rating.deliveryTime }}</div>
                        </div>
                        <p class="text">
                            {{ rating.text }}
                        </p>
                        <div v-show="rating.recommend.length" class="recommend">
                            <span :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                            <span v-for="item in rating.recommend">
                                {{ item }}
                            </span>
                        </div>
                        <div class="time">
                            {{ rating.rateTime | formatDate }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import split from 'com/split/split';
import score from 'com/score/score';
import ratingSelect from 'com/ratingSelect/ratingSelect';
import IScroll from 'better-scroll';
import {
    formatDate
} from 'common/js/date';

export default {
    data() {
            return {
                sellerScore: {
                    len: 5,
                    score: 0
                },
                goodScore: {
                    len: 5,
                    score: 0
                },
                seller: {},
                ratings: [],
                selectType: 2,
                isContent: true
            };
        },
        created() {
            this.$http.get('/api/ratings').then((res) => {
                if (res.body.erron === 0) {
                    this.ratings = res.body.data;
                    this.$nextTick(() => {
                        if (!this.ratingsScroll) {
                            this.ratingsScroll = new IScroll(this.$refs.ratingsS, {
                                click: true
                            });
                        };
                    });
                };
            });
            this.$http.get('/api/seller').then((res) => {
                if (res.body.erron === 0) {
                    this.seller = res.body.data;
                    this.$nextTick(() => {
                        this.sellerScore.score = this.seller.serviceScore;
                        this.goodScore.score = this.seller.foodScore;
                    });
                };
            });
        },
        mounted() {
            window.EM.$on('select', (type) => {
                this.selectType = type;
            });
            window.EM.$on('checked', (type) => {
                this.isContent = type;
            });
        },
        methods: {
            changeRating(data) {
                // 在数据改变之后重新计算当前容器的高度, 让 Iscroll 能够滚动
                this.$nextTick(() => {
                    this.ratingsScroll.refresh();
                });
                if (this.isContent && !data.text) {
                    return false;
                }
                if (this.selectType === 2) {
                    return true;
                };
                if (data.rateType === this.selectType) {
                    return true;
                }
                return false;
            }
        },
        components: {
            score,
            ratingSelect,
            split
        },
        filters: {
            formatDate(date) {
                let time = new Date(date);
                return formatDate(time, 'yyyy-MM-dd hh:mm');
            }
        }
};
</script>
<style lang="less">
#ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}

.ratings-wrapper {
    width: 100%;
    .ratings-score {
        display: flex;
        padding: 18px 0;
        .left {
            flex: 0 0 137px;
            text-align: center;
            padding: 6px 0;
            width: 137px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            .score {
                margin-bottom: 6px;
                line-height: 28px;
                font-size: 24px;
                color: #f90;
            }
            .title {
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
                color: #07111b;
            }
            .rank {
                line-height: 10px;
                font-size: 10px;
                color: #93999f;
            }
        }
        .right {
            flex: 1;
            padding: 6px 0 6px 24px;
            @media screen and (max-width: 320px) {
                padding-left: 6px;
            }
            .score-wrapper {
                margin-bottom: 8px;
                font-size: 0;
                .title {
                    display: inline-block;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 12px;
                    color: #07111b;
                }
                .star {
                    display: inline-block;
                    margin: 0 6px 0 12px;
                    vertical-align: top;
                    @media screen and (max-width: 320px) {
                        margin: 0 0 0 3px;
                    }
                    span {
                        width: 16px;
                        height: 16px;
                        margin-right: 5px;
                    }
                }
                .score {
                    display: inline-block;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 12px;
                    color: #f90;
                }
            }
        }
        .delivery-wrapper {
            .title {
                line-height: 18px;
                vertical-align: top;
                font-size: 12px;
                color: #07111b;
            }
            .time {
                margin-left: 12px;
                font-size: 12px;
                color: #93999f;
            }
        }
    }
    .ratings-selete-hook {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .bottom {
            border: none;
        }
    }
    .comment-list {
        padding: 0 18px;
        .comment-item {
            display: flex;
            padding: 18px 0;
            position: relative;
            .avatar {
                flex: 0 0 28px;
                width: 28px;
                margin-right: 12px;
                img {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }
            }
            .content {
                flex: 1;
                .name {
                    margin-bottom: 4px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #07111b;
                }
                .star-wrapper {
                    margin-bottom: 6px;
                    font-size: 0;
                    .seller-score {
                        display: inline-block;
                        text-align: left;
                        span {
                            width: 12px;
                            height: 12px;
                            margin-right: 3px;
                        }
                    }
                    .dtime {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                        color: #93999f;
                    }
                }
                .text {
                    margin-bottom: 8px;
                    line-height: 18px;
                    color: #07111b;
                    font-size: 12px;
                }
                .recommend {
                    line-height: 16px;
                    font-size: 0;
                    span {
                        font-size: 10px;
                        padding: 0 6px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        border-radius: 1px;
                        color: #93999f;
                        background: #fff;
                        display: inline-block;
                        margin: 0 8px 4px 0;
                        font-size: 9px;
                        &[class^='icon-'] {
                            margin: 0 0 4px 0;
                            font-size: 9px;
                            border: none;
                        }
                        &.icon-thumb_up {
                            color: #00a0dc;
                        }
                        &.icon-thumb_down {
                            color: #93999f;
                        }
                    }
                }
                .time {
                    position: absolute;
                    top: 15px;
                    right: 0;
                    line-height: 12px;
                    font-size: 10px;
                    color: #93999f;
                }
            }
        }
    }
}
</style>
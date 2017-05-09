<template>
    <div class="ratings-wrapper">
        <div class="ratings-score">
            <div class="left">
                <div class="score">4.2</div>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家69.2%</div>
            </div>
            <div class="right">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <div class="star">
                        <score :score='score'></score>
                    </div>
                    <span class="score">4.1</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <div class="star">
                        <score :score='score'></score>
                    </div>
                    <span class="score">4.1</span>
                </div>
                <div class="delivery-wrapper">
                    <span class="title">送达时间</span>
                    <span class="time">38分钟</span>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <div class="ratings-selete-hook">
            <rating-select></rating-select>
        </div>
        <ul class="comment-list">
            <li></li>
        </ul>
    </div>
</template>
<script>
import score from 'com/score/score';
import ratingSelect from 'com/ratingSelect/ratingSelect';

export default {
    data() {
            return {
                score: {
                    len: 5,
                    score: 4.1
                }
            };
        },
        components: {
            score,
            ratingSelect
        }
};
</script>
<style lang="less">
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
    .split {
        width: 100%;
        height: 16px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        background: #f3f5f7;
    }

}
</style>

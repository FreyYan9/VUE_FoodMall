<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="item,$index in footList" :class="{current: currentIndex == $index}" @click='selectMenu($index,$event)'>
                    <span class="text line">
                        <span :class="classMap[item.type]"></span> {{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="foods-item foods-item-hook" v-for='item in footList'>
                    <h1 class="foods-item-title"> {{ item.name }} </h1>
                    <ul>
                        <li @click="selectGood(food, $event)" class="food-item line" v-for='food in item.foods'>
                            <div>
                                <img class="food-img" :src="food.icon" alt="">
                            </div>
                            <div>
                                <h2 class="food-name"> {{ food.name }}</h2>
                                <div class="desc"> {{ food.description }} </div>
                                <div class="sales">月售{{ food.sellCount }}份&nbsp;&nbsp;&nbsp;好评率{{ food.rating }}%</div>
                                <div class="price">
                                    <span class="new-p">¥ {{ food.price }}</span>
                                    <span class="old-p" v-if='food.oldPrice'>¥ {{ food.oldPrice }}</span>
                                </div>
                                <div class="to-cat">
                                    <cart-control @add="addAnimate" :food="food"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :seller="seller" :select-foods="selectFoods"></shopcart>
        <goodDetail ref="goodDetail" :good="seletedGood"></goodDetail>
    </div>
</template>
<script>
import IScroll from 'better-scroll';
import shopcart from 'com/shopcart/shopcart';
import cartControl from 'com/cartControl/cartControl';
import goodDetail from './goodDetail';

const ERR_OK = 0;
export default {
    name: 'goods',
    props: ['seller'],
    data() {
        return {
            footList: [],
            heightList: [],
            menuScroll: {},
            foodsScroll: {},
            scrollY: 500,
            seletedGood: {}
        };
    },
    created() {
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        this.$http.get('/api/goods').then((res) => {
            res = res.body;
            if (res.erron === ERR_OK) {
                this.footList = res.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._autoClass();
                });
            }
        });
    },
    mounted() {
        // 全局事件管理器, 接受 GoodDetail 传输过来的事件
        window.EM.$on('detailFirst', (el) => {
            this.$nextTick(() => {
                this.$refs.shopcart.drop(el);
            });
        });
    },
    methods: {
        _initScroll() {
            this.menuScroll = new IScroll(this.$refs.menuWrapper, {
                probeType: 3,
                click: true
            });
            this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click: true
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _autoClass() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-item-hook');
            let height = 0;
            this.heightList.push(height);
            for (let i = 0; i < foodList.length; i++) {
                height += foodList[i].scrollHeight;
                this.heightList.push(height);
            }
        },
        selectMenu(idx, e) {
            if (e._constructed) {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-item-hook');
                this.foodsScroll.scrollToElement(foodList[idx], 300);
                // this.foodsScroll.scrollTo(0, '-' + this.heightList[idx], 500, 'easing');
            }
        },
        addAnimate(el) {
            this.$nextTick(() => {
                this.$refs.shopcart.drop(el);
            });
        },
        selectGood(good, event) {
            if (event._constructed) {
                this.seletedGood = good;
                this.$refs.goodDetail.show();
            }
        }
    },
    computed: {
        currentIndex() {
            for (var i = 0; i < this.heightList.length; i++) {
                let height1 = this.heightList[i];
                let height2 = this.heightList[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.footList.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    components: {
        shopcart,
        cartControl,
        goodDetail
    }
};
</script>
<style lang="less">
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
        ul {
            li {
                display: table;
                height: 54px;
                width: 56px;
                font-size: 12px;
                padding: 0 12px;
                line-height: 14px;
                &.current {
                    background-color: #fff;
                    margin-top: -1;
                }
                .text {
                    display: table-cell;
                    vertical-align: middle;
                    // border-bottom: 1px dashed rgba(7, 17, 27, .1);
                    span {
                        width: 15px;
                        height: 15px;
                        background-size: 100%;
                        vertical-align: sub;
                        background-size: 15px 15px;
                        background-repeat: no-repeat;
                        &.decrease {
                            display: inline-block;
                            background-image: url('/static/img/goods/decrease_1@2x.png');
                        }
                        &.discount {
                            display: inline-block;
                            background-image: url('/static/img/goods/discount_1@2x.png');
                        }
                        &.guarantee {
                            display: inline-block;
                            background-image: url('/static/img/goods/guarantee_1@2x.png');
                        }
                        &.invoice {
                            display: inline-block;
                            background-image: url('/static/img/goods/invoice_1@2x.png');
                        }
                        &.special {
                            display: inline-block;
                            background-image: url('/static/img/goods/special_1@2x.png');
                        }
                    }
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        font-size: 12px;
        font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;
        .foods-item {
            .foods-item-title {
                height: 26px;
                line-height: 26px;
                padding-left: 14px;
                border-left: 2px solid #d9dde1;
                color: #93999f;
                background-color: #f3f5f7;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .food-img {
                    width: 57px;
                    height: 57px;
                    margin-right: 10px;
                }
                .food-name {
                    font-size: 14px;
                    line-height: 14px;
                    margin: 2px 0 8px 0;
                }
                .desc {
                    color: #93999f;
                    margin-bottom: 8px;
                    line-height: 12px;
                }
                .sales {
                    color: #93999f;
                    line-height: 12px;
                }
                .price {
                    line-height: 24px;
                    font-size: 14px;
                    .new-p {
                        color: red;
                    }
                    .old-p {
                        foont-size: 10px;
                        text-decoration: line-through;
                        color: #93999f;
                    }
                }
                .to-cat {
                    position: absolute;
                    right: 0;
                    bottom: 5px;
                }
                &:last-child {
                    padding: 0;
                    &::after {
                        border: none;
                    }
                }
            }
        }
    }
}
</style>
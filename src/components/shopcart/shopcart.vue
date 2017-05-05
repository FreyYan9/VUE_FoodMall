<template>
    <div class="shopcart">
        <div class="content">
            <div class='content-left' @click='showList'>
                <div class="logo">
                    <div class="icon-cart" :class="{ 'no-food' : totalCout == 0 }"><i class="icon-shopping_cart"></i></div>
                    <div class="num" v-show='totalCout > 0'>{{ totalCout }}</div>
                </div>
                <div class="price" :class="{ 'no-price': totalPrice == 0 }">
                    ¥ {{ totalPrice }}
                </div>
                <div class="desc">
                    另需配送费 ¥ {{ seller.deliveryPrice }}元
                </div>
            </div>
            <div class='content-right'>
                <div class="no" :class="{ 'goPay': totalPrice >= 20 }" @click="goPay">
                    {{ payDesc }}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
            <div class="food-list" v-show='isShowList'>
                <div class="list-top line">
                    <p>购物车</p>
                    <p @click='clearCart'>清空</p>
                </div>
                <div class="list-body" ref="foodList">
                    <ul>
                        <li class="line" v-for="food in selectFoods">
                            <div class="name">{{ food.name }}</div>
                            <div class="price">¥ {{ food.price }}</div>
                            <div class="cart-wrapper">
                                <cart-control @add='drop' :food="food"></cart-control>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="list-mask" @click='showList' v-show='isShowList'>
            </div>
        </transition>
    </div>
</template>
<script>
import IScroll from 'better-scroll';
import CartControl from 'com/cartControl/cartControl';

export default {
    name: 'shopcart',
    props: {
        seller: {
            type: Object
        },
        selectFoods: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: [],
            isShowList: false
        };
    },
    methods: {
        _initScroll() {
            if (!this.listScroll) {
                this.listScroll = new IScroll(this.$refs.foodList, {
                    click: true
                });
            }
        },
        goPay() {
            if (this.totalPrice >= this.seller.minPrice) {
                alert(`支付${this.totalPrice + this.seller.deliveryPrice}元\n食品金额: ¥ ${this.totalPrice}元,\n配送费用: ¥ ${this.seller.deliveryPrice}元`);
            }
        },
        drop(el) {
            for (var i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        showList() {
            if (this.totalCout > 0) {
                this.isShowList = !this.isShowList;
            }
            this.$nextTick(function() {
                this._initScroll();
            });
        },
        clearCart() {
            if (confirm('是否清空购物车?')) {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            }
        }
    },
    computed: {
        totalPrice() {
            let price = 0;
            this.selectFoods.forEach((food) => {
                price += food.price * food.count;
            });
            return price;
        },
        totalCout() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                this.isShowList = false;
                return `¥${this.minPrice || 0}元起送`;
            } else if (this.totalPrice < 20) {
                return `还差¥${parseInt(this.seller.minPrice) - parseInt(this.totalPrice)}元起送`;
            } else if (this.totalPrice >= 20) {
                return '去结算';
            }
        }
    },
    components: {
        CartControl
    }
};
</script>
<style lang="less">
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 10;
    .content {
        background-color: #141d27;
        color: rgba(255, 255, 255, 0.4);
        display: flex;
        height: 100%;
        .content-left {
            flex: 1;
            box-sizing: border-box;
            z-index: 12;
            div {
                display: inline-block;
            }
            .logo {
                position: relative;
                width: 56px;
                height: 56px;
                margin: 0 12px;
                text-align: center;
                background-color: #141d27;
                border: 6px solid #141d27;
                border-radius: 50%;
                top: -10px;
                box-sizing: border-box;
                .icon-cart {
                    background: #00a0dc;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    &.no-food {
                        background-color: #2b343c;
                        [class^="icon-"] {
                            color: #80858a;
                        }
                    }
                    [class^="icon-"] {
                        color: #fff;
                        font-size: 24px;
                        line-height: 2;
                    }
                }
                .num {
                    position: absolute;
                    border-radius: 10px;
                    background-color: red;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-weight: bold;
                    color: #fff;
                    top: -5px;
                    right: -5px;
                    font-size: 10px;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                vertical-align: top;
                font-size: 16px;
                font-weight: 700;
                color: #fff;
                margin-top: 12px;
                padding-right: 12px;
                line-height: 24px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                &.no-price {
                    color: rgba(255, 255, 255, 0.4);
                }
            }
            .desc {
                margin: 12px 0 0 12px;
                vertical-align: top;
                font-size: 10px;
                line-height: 24px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            z-index: 11;
            .no {
                background: #2b333b;
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                &.goPay {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all 0.4s linear;
                z-index: 15;
            }
        }
    }
    .food-list {
        width: 100%;
        position: absolute;
        // top: 0;
        bottom: 48px;
        left: 0;
        z-index: 11;
        .list-top {
            display: flex;
            padding: 0 18px;
            justify-content: space-between;
            background-color: #F3F5F7;
            height: 40px;
            line-height: 40px;
            color: rgb(7, 17, 27);
            font-weight: 100;
            p {
                &:first-child {
                    font-size: 14px;
                }
                &:last-child {
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
        }
        .list-body {
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            padding: 0 18px;
            li {
                position: relative;
                padding: 12px 0;
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: #07111b;
                }
                .price {
                    position: absolute;
                    right: 105px;
                    bottom: 15px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #f01414;
                }
                .cart-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 9px;
                    font-size: 24px;
                }
                &:last-child::after {
                    border: none;
                }
            }
        }
    }
    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.6);
        z-index: 10;
        backdrap-filter: blur(10px);
    }
}
</style>

<template>
    <div class="cart-container">
        <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <div class="icon-remove_circle_outline cart-reduce" v-show='food.count > 0' @click.stop="reduceCart($event)"></div>
        </transition>
        <div class="cart-count" v-show='food.count > 0'>{{ food.count }}</div>
        <div class="icon-add_circle cart-add" @click.stop='addCart($event)'></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'cartControl',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(e) {
            if (!e._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count++;
                console.log(this.food.count);
            } else {
                Vue.set(this.food, 'count', 1);
            }
            this.$emit('add', e.target);
        },
        reduceCart(e) {
            if (!e._constructed) {
                return;
            }
            if (this.food.count && this.food.count > 0) {
                this.food.count--;
            }
        }
    }
};
</script>
<style lang='less'>
.cart-container {
    .cart-count {
        display: inline-block;
        /*vertical-align: super;*/
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #93999f;
    }
    [class^="icon"] {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
    }
}
</style>
<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab line">
            <div class="tab-item">
                <!-- <a v-link="{path='/goods'}">商品</a> -->
                <router-link to='/' exact>商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/ratings'>评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/seller'>商家</router-link>
            </div>
        </div>
        <div class="centent">
            <router-view :seller="seller"></router-view>
        </div>
    </div>
</template>
<script>
import header from 'com/header/header';

const ERR_OK = 0;
export default {
    name: 'app',
    data() {
        return {
            seller: {}
        };
    },
    created() {
        var _self = this;
        _self.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.erron === ERR_OK) {
                _self.seller = response.data;
            }
        });
    },
    components: {
        'v-header': header
    }
};
</script>
<style lang='less'>
/* 解决移动端1px */

@import url(./common/less/index.css);
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
}

.tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
        flex: 1;
        text-align: center;
        a {
            display: block;
            color: black;
            font-size: 14px;
            &.router-link-active {
                color: red;
            }
        }
    }
}
</style>

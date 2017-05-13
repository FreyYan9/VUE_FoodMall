<template>
    <div class='showImage'>
        <div class="image-wrapper" ref='imageBox'>
            <div class="close">
                <i class='icon-close' @click="hide"></i>
            </div>
            <!-- <ul class="image-list">
                <li class="image-item" v-for="img in images"><img :src="img" alt=""></li>
            </ul> -->
            <div class="content">
                <img ref="img" :src="images" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShowImage',
    props: {
        images: {
            type: String,
            default () {
                return '';
            }
        }
    },
    data() {
        return {};
    },
    watch: {
        'images' () {
            this.$nextTick(() => {
                console.log(this.$refs.img.style.width);
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            // let _iHeight = this.$refs.img.style.height;
            // let _Oheight = this.$refs.imageBox.style.height;

            // console.log(this.$refs.img.style);
        });
    },
    methods: {
        hide() {
            window.EM.$emit('hideImg');
        }
    }
};
</script>
<style lang='less' scoped>
.showImage {
    /*background: #000;*/
    background-color: rgba(7, 17, 27, 0.9);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .image-wrapper {
        position: relative;
        height: 100%;
        .close {
            position: absolute;
            bottom: 80px;
            right: calc(50%);
            height: 32px;
            width: 32px;
            font-size: 32px;
            color: #fff;
            i {
                padding: 15px;
            }
        }
        .content {
            width: 100%;
            height: 100%;
            img {
                position: absolute;
                width: 100%;
                top: 15%;
                left: 0;
            }
        }
    }
}
</style>

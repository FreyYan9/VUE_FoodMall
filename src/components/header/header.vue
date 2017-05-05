<template>
    <div class="header">
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>

      <div class="content-wrapper">
        <div class='avatar'>
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="seller-name">
            <span></span>{{ seller.name }}
          </div>
          <div class="seller-description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="seller-support">
            <span :class="classMap[seller.supports[0].type]"></span>
            {{seller.supports[0].description}}
          </div>
        </div>
        <div class="notice-wrapper" @click="showConver">
          <span>32个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>

      <div class="affiche-wrapper" @click="showConver">
          <span></span>
          <span>{{ seller.bulletin }}</span>
          <span><i class="icon-keyboard_arrow_right"></i></span>
      </div> 

      <transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
        <div class="cover-wrapper" v-show="isShowConver">
          <div class="cover-conent clearfix">
              <div class="conver-con">
                  <h1>{{ seller.name }}</h1>
                  <div class="seller-grade">
                    <score :score="score"></score>
                  </div>
                  <div class="seller-preferential">
                    <div class="line"></div>
                    <div class="title">优惠信息</div>
                    <div class="line"></div>
                  </div>
                  <ul class="seller-prefer" v-if="seller.supports">
                    <li v-for="item in seller.supports">
                      <span :class="classMap[item.type]"></span>
                      <span>{{item.description}}</span>
                    </li>
                  </ul>
                  <div class="seller-placard">
                    <div class="line"></div>
                    <div class="title">商家公告</div>
                    <div class="line"></div>
                  </div>
                  <div class="seller-placard-content">
                    <p>{{ seller.bulletin }}</p>
                  </div>
              </div>
          </div>
          <div class="cover-close" @click="hiddenConver">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
  
    </div>

</template>

<script>
  import score from 'com/score/score';

  export default{
    name: 'Header',
    props: ['seller'],
    data () {
      return {
        isShowConver: false,
        score: {},
        show: true
      };
    },
    created () {
      var _self = this;
      _self.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      setTimeout(function () {
        _self.score = {
          len: 5,
          score: _self.seller.score
        };
      }, 100);
    },
    methods: {
      showConver () {
        this.isShowConver = true;
      },
      hiddenConver () {
        this.isShowConver = false;
      }
    },
    components: {
      score
    }
  };
</script>

<style lang="less">
  @import '../../common/less/icon.css';
  @import '../../common/less/common.css';
  @import '../../../static/css//animate/animate.css';


  .header{
    // height: 60px;
    // line-height: 60px;
    position: relative;
    overflow: hidden;
    color: #fff;
    font-size: 0px; 
    background-color: rgba(7,17,27,0.5);
    .background{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      z-index: -1;
      opacity: .8;
      filter: blur(10px);
      img{
        width: 100%;
      }
    }
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      display: flex;
      position: relative;    
      height: 64px;      
      .avatar img{
        width: 64px;
        height: 64px;
      }
      .content{
        margin-left: 16px;
        font-size: 14px;
        .seller-name{
          vertical-align: top;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
          span{
            display: inline-block;
            margin: 0 6px 10px 0 ;
            width: 30px;
            height: 18px;
            // .mateIcon('/brand');
            background: url('./brand@2x.png');
            background-size: 100%;
            vertical-align: text-top;
          }
        }
        .seller-description,.seller-support{
          font-size: 12px;
          line-height: 12px;
          margin-bottom: 10px;
        }
        .seller-support{
          span{
            // .mateIcon('/src/components/header/brand');
            // background-image: url('./decrease_1@2x.png');
            background-repeat: no-repeat;
            background-size: 100%;
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 4px;
            &.decrease{
              background-image: url('./decrease_1@2x.png');
            }
            &.discount{
              background-image: url('./discount_1@2x.png');
            }
            &.guarantee{
              background-image: url('./guarantee_1@2x.png');
            }
            &.invoice{
              background-image: url('./invoice_1@2x.png');
            }
            &.special{
              background-image: url('./special_1@2x.png');
            }
          }
        }
      }
      .notice-wrapper{
          position: absolute;
          bottom: 14px;
          right: 12px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          border-radius: 14px;
          background: rgba(0,0,0,0.2);
          font-size: 12px;
          .icon-keyboard_arrow_right{
            color: #fff;
            line-height: 100%;
          }
        }
    }
    .affiche-wrapper{
      position: relative;
      font-size: 10px;
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 22px 0 12px;
      background: rgba(7,17,27,0.2);
     span:first-child{
        display: inline-block;
        background: url('./bulletin@2x.png');
        background-size: 100%;
        width: 22px;
        height: 12px;
        vertical-align: text-top;
      }
      span:last-child{
        position: absolute;
        right: 8px;
        top: 0;
        font-size: 14px;
      }
    }
    .cover-wrapper{
      color: #fff;
      font-size: 14px;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(7,17,27,.8);
      backdrop-filter: blur(10px);
      z-index: 100;
      overflow: auto;
      .cover-conent{
        width: 100%;
        min-height: 100%;
        .conver-con{
          padding-bottom: 64px;
          width: 80%;
          margin: 0 auto;
          .line{
            border-bottom: 1px solid rgba(255,255,255,0.2);
            margin-top: 8px;
            height: 1px;
            flex: 1;
          }
          h1{
            padding: 64px 0 0 0;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
          }
          .seller-grade{
            text-align: center;
            margin-top: 18px;
            padding: 2px 0;
            span{
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 22px;
            }
          }
          .seller-preferential{
            position: relative;
            display: flex;
            width: 100%;
            text-align: center;
            margin: 28px auto 24px auto;
            .title{
              padding: 0 10px;
            }
          }
          .seller-prefer{
            width: 100%;
            margin: 0 auto;
            li{
              padding: 0 12px;
              margin-bottom: 12px;
              span{
                display: inline-block;
                line-height: 16px;
                font-size: 12px;
                font-family: monospace;
                &:first-child{
                  width: 16px;
                  height: 16px;
                  margin-right: 6px;
                  background-size: 100%;
                  vertical-align: text-top;
                  &.decrease{
                    background-image: url('./decrease_1@2x.png');
                  }
                  &.discount{
                    background-image: url('./discount_1@2x.png');
                  }
                  &.guarantee{
                    background-image: url('./guarantee_1@2x.png');
                  }
                  &.invoice{
                    background-image: url('./invoice_1@2x.png');
                  }
                  &.special{
                    background-image: url('./special_1@2x.png');
                  }
                }
              }
            }
          }
          .seller-placard{
            position: relative;
            display: flex;
            width: 100%;
            text-align: center;
            margin: 28px auto 24px auto;
            .title{
              padding: 0 10px;
            }
          }
          .seller-placard-content{
            width: 100%;
            margin: 28px auto 24px auto;
            p{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
              font-family: monospace;
            }
          }
        }
      }
    }
    .cover-close{
      height: 32px;
      width: 32px;
      margin: -64px auto 0 auto;
      i{
        font-size: 32px;
      }
    }
  }
</style>


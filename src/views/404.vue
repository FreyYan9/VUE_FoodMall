<template>
    <div class="notfound">
        <!-- <img src="../assets/images/noPage.png" alt=""> -->
        <div>
            <router-link to='/home'>返回首页</router-link>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'notFind',
        data () {
            return {

            };
        }
    };
</script>

<style>
    .notfound{
        background-color: #EDEFF5 !important;
        /*background-color: red !important;*/
    }
    .notfound img{
        position: fixed;
        top: calc(50% - 180px);
        left: calc(50% - 290px);
    }
    .notfound div{
        width: 100px;
        height: 45px;
        line-height: 45px;
        background-color: #F9FAFC;
        position: fixed;
        top: 48.5%;
        left: 47%;
        color:#ccc;
    }
    .notfound a,.notfound a:hover{
        text-decoration: none;
        color: #34383B;  
        font-size: 18px;
        font-family: cursive;  
    }
</style>

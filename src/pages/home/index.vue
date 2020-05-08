<template>
    <div class="page">
        <div class="demo" v-highlightFmt="key">{{msg}}</div>
        <p>{{num | kNumFmt | nullFmt}}</p>
        <p>{{num | nullFmt('元')}}</p>
        <p>{{num | bytesToSize}}</p>
        <input type="text" v-model="key" />
        <div class="btn" @click="clickEvt">模拟登录过期</div>
        <div class="btn" @click="clickVuexEvt">VUEX</div>
    </div>
</template>

<script>
// vue 不建议使用jq，如需要，请自行配置jq全局方法，不建议这样的导入操作
import $ from '../../../static/js/jquery-1.11.1.min'
// import MD5 from '../../util/md5.js'

export default {
    name: 'Home',
    data () {
        return {
            num: 1234567.5850,
            key: 'come',
            msg: 'Welcome'
        }
    },
    methods: {
        clickEvt () {
            this.$api.home().then(
                res => {
                    this.$log(res)
                },
                err => {
                    this.$log(err)
                }
            )
        },
        clickVuexEvt () {
            this.$router.push({ path: '/demo' })
        }
    },
    mounted () {
        this.$log('重写后的toFixed:', this.num.toFixed(2))
        this.$log('重写后的toFixed:', this.$filter.kNumFmt(-0.01))

        $.ajax({
            type: 'POST',
            url: '/api/example/login',
            // contentType: 'application/x-www-form-urlencoded',
            data: {
                acc: 'cc',
                psw: '123456'
            },
            success: function (result) {
                // eslint-disable-next-line
                console.log(result)
            }
        })
    }
}

</script>

<style scoped lang="scss">
@import "../../assets/_var.scss";
.page {
    display: block;
    margin: auto;
    width: 300px;
}
.demo /deep/ {
    display: block;
    margin: auto;
    height: px2rem(50px);
    font-size: px2rem(24px);
    i {
        color: #ff0000;
    }
}
.btn {
    display: block;
    margin: 40px auto;
    width: 120px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #eee;
}
</style>

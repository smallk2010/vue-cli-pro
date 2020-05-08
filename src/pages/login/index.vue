<template>
    <div class="page">
        <div class="demo">{{msg}}</div>
        <div class="btn" @click="clickLoginEvt">登录</div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data () {
        return {
            msg: 'Welcome Login'
        }
    },
    methods: {
        clickLoginEvt () {
            this.$api.login().then(
                res => {
                    this.$session.set('token', 'cC')
                    this.$router.push({ path: '/home' })
                },
                err => {
                    this.$log(err)
                }
            )
        }
    },
    mounted () {
    }
}

</script>

<style scoped lang="scss">
.demo {
    display: block;
    margin: auto;
    padding: 40px 0;
    width: 200px;
    height: 50px;
    font-size: 24px;
    text-align: center;
}
.btn{
    display: block;
    margin: auto;
    width: 120px;
    font-size: 20px;
    text-align: center;
    border: 1px solid #eee;
}
</style>

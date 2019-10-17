<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in"   title="" :bordered="false" style="background: linear-gradient(230deg,rgba(53,57,74,0),#000);">
        <span style=" color:#ffffff">欢迎登录商户管理系统</span>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
        if (res.code === '0') {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
        } else {
          this.$Message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
.ivu-card-head {
   color: #ffffff !important;
  border-bottom:0 !important;
  .ivu-icon-log-in {
    span {
      color: red !important;
    }
  }
}

</style>

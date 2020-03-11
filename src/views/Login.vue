<template>
  <div class="Login">
    <LoginComp/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComp from '@/components/LoginComp.vue'; // @ is an alias to /src

@Component({
  components: {
    LoginComp,
  },
  metaInfo: {
    titleTemplate: '%s-登录'
  }
})
export default class Login extends Vue {
}
</script>
<style lang="less" scoped>
  .Login{
    background-image: url('/img/login.jpg');
    width:100%;
    height:100%;
    min-width: 1000px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

  }
</style>

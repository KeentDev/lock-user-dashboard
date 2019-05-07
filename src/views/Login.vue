<template>
  <div class="login-cntr col">
    <div class="content">
      <div class="head col center">
        <span>LOGIN</span>
        <span>TO YOUR UNIT</span>
      </div>
      <div class="modal-cntr">
        <div class="form-fields col --series">
          <div class="form-field col">
            <label for="id_number">Id Number</label>
            <input v-model="idnumber" type="text" name="id_number">
          </div>
          <div class="form-field col">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password">
          </div>
        </div>
        <div class="cta-btn stick-middle row center" @click="login">
          Login
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idnumber: '',
      password: ''
    }
  },
  beforeCreate() {
    this.$store.dispatch('logout');
  },
  methods: {
    login: function() {
      const idnumber = this.idnumber;
      const password = this.password;
      this.$store.dispatch('login', { id_num: idnumber, password })
        .then(() => this.$router.push('/'))
        .catch((err) => {
          console.error(err);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-cntr {
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
  box-shadow: 6px 28px 64px -18px rgba($blue,.65);
}

.form-fields {
  padding: 2rem 1rem;
  width: 16rem;
  @include series-col(1rem);
}

.cta-btn {
  width: 100%;
  border: 1px solid $bp;
  padding: .75rem 0;
  color: white;
  font-weight: 600;
  background-color: $blue;
  cursor: pointer;
  box-sizing: border-box;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #999;
}

input {
  border-radius: 5px;
  border: 1px solid #EEE;
  font-size: 14px;
  color: #333;
  padding: 6px 8px;
  font-weight: 600;
}

.head {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  span {
    font-size: 16px;
    font-weight: 600;
    &:first-child {
      color: $blue;
    }
    &:last-child {
      color: #BBB;
      opacity: .75;
    }
  }
}
</style>

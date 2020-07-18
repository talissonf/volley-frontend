<template>
  <div>
    <v-card class="mx-auto card-home" max-width="400" :elevation="5">
      <v-form v-model="valid" v-on:submit.prevent="onSubmit">
        <div class="login-form">
        <v-text-field
          label="Apelido"
          autocomplete="off"
          v-model="nickname"
          :rules="nicknameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Senha"
          type="password"
          autocomplete="off"
          v-model="password"
          :rules="passwordRules"
          required
        ></v-text-field>
        </div>
        <div style="margin-top: 1em; margin: 10px">
          <v-btn
            style="background-color: rebeccapurple; color: white;"
            type="submit"
            submit
            :disabled="valid ? false : true"
            @click="snackbar = true"
          >Enviar</v-btn>
          <v-divider style="margin-top: 1em;width: 100%" />
        </div>
        <v-row class="mb-6" no-gutters>
          <v-col sm="2" md="5">
            <v-btn to="/register" style="background-color: #1E88E5; color: white;">Criar conta</v-btn>
          </v-col>
          <v-col sm="2" md="5">
            <v-btn
              to="/recovery"
              style="background-color: #1E88E5; color: white;"
            >Esqueci minha senha</v-btn>
          </v-col>
        </v-row>

        <v-alert v-if="message" style="background-color: #FF5252; color: white">{{ message }}</v-alert>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    message() {
      return this.$store.state.messageLogin;
    }
  },
  data() {
    return {
      valid: false,
      snackbar: false,
      nickname: "",
      password: "",
      nicknameRules: [
        nickname => !!nickname || "É necessário indicar o seu apelido na sala."
      ],
      passwordRules: [
        password => !!password || "É necessário indicar a sua senha."
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("signIn", {
        nickname: this.nickname,
        password: this.password
      });
    }
  },
  beforeCreate() {
    let { isAuthenticated } = this.$store.getters;

    if (isAuthenticated) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.card-home {
  padding: 1em;
  width: 90%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.login-form {
  margin: 1em;
}
</style>
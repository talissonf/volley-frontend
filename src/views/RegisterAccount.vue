<template>
  <div>
    <v-card class="mx-auto card-home" max-width="400" :elevation="5">
      <v-form v-model="valid" v-on:submit.prevent="onSubmit">
        <v-text-field
          :label="nicknameParam ? '' : 'Apelido'"
          autocomplete="off"
          v-model="nickname"
          :rules="nicknameRules"
          :disabled="nicknameParam ? true : false"
          required
        ></v-text-field>
        <v-text-field
          label="Discord tag"
          autocomplete="off"
          v-model="discordTag"
          :rules="discordTagRules"
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
        <div style="margin-top: 1em; margin: 10px">
          <v-btn to="/login" style="background-color: #4CAF50; color: white;">Voltar</v-btn>
          <v-btn
            style="background-color: rebeccapurple; color: white;"
            type="submit"
            submit
            :disabled="valid ? false : true"
          >Enviar</v-btn>
        </div>
      </v-form>
      <v-alert v-if="message" v-html="message" style="background-color: #FF5252; color: white" />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      nickname: "",
      password: "",
      discordTag: "",
      nicknameRules: [
        nickname => !!nickname || "É necessário indicar o seu apelido na sala."
      ],
      discordTagRules: [
        tag => !!tag || "Digite aqui a Tag que você usa no Discord."
      ],
      passwordRules: [
        password => !!password || "É necessário indicar a sua senha."
      ]
    };
  },
  computed: {
    nicknameParam() {
      return this.$router.currentRoute.params.nickname;
    },
    message() {
      return this.$store.state.messageRegister;
    }
  },
  methods: {
    onSubmit() {
      return this.$store.dispatch("signUp", {
        nickname: this.nickname,
        password: this.password,
        discordTag: this.discordTag
      });
    }
  },
  created() {
    if (this.$router.currentRoute.params.nickname) {
      this.nickname = this.$router.currentRoute.params.nickname;
    }
  }
};
</script>

<style scoped>
.card-home {
  padding: 3em;
  width: 90%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
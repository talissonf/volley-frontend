<template>
  <div>
    <div v-if="this.$store.state.existsUser" v-on:submit.prevent="submit">
      <v-form v-model="valid">
        <v-text-field label="Código" v-model="code" :rules="codeRules" autocomplete="off"></v-text-field>
        <div style="margin-top: 1em; margin: 10px">
          <v-btn to="/login" style="background-color: #4CAF50; color: white;">Voltar</v-btn>
          <v-btn
            style="background-color: rebeccapurple; color: white;"
            type="submit"
            :disabled="valid ? false : true"
          >Enviar</v-btn>
        </div>
        <v-alert
          v-if="message"
          style="background-color: #FF5252; color: white; margin-top: 1em"
        >{{ message }}</v-alert>
      </v-form>
    </div>
    <div v-else>
      <v-progress-circular indeterminate="indeterminate" :size="64" :width="4" color="light-blue" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecoverySecond",
  data() {
    return {
      valid: false,
      code: "",
      codeRules: [
        v => !!v || "Você precisa colocar o seu código que foi enviado para você no Discord."
      ]
    };
  },
  computed: {
    message() {
      return this.$store.state.messageRecovery2;
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("verifyCode", {
        discordTag: this.$store.state.recoveredUser.user.tag,
        haxballUser: this.$store.state.haxballUser,
        code: this.code
      });
    }
  }
};
</script>
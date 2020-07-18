<template>
  <div>
    <div v-if="this.$store.state.existsUser">
      <v-text-field label="Nova senha" type="password" v-model="password1" autocomplete="off"></v-text-field>
      <v-text-field label="Nova senha novamente" type="password" v-model="password2" autocomplete="off"></v-text-field>
      <v-btn @click="submit" style="width: 90%; color: #ffffff" color="#1E88E5" >Alterar senha</v-btn>
      <v-alert v-if="message" style="background-color: #FF5252; color: white; margin-top: 1em">{{ message }}</v-alert>
      <v-alert v-if="message1" style="background-color: #4CAF50; color: white; margin-top: 1em">{{ message1 }}</v-alert>
    </div>
    <div v-else>
      <v-progress-circular indeterminate="indeterminate" :size="64" :width="4" color="light-blue" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecoveryThird",
  computed: {
    message1() {
      return this.$store.state.messageRecovery3
    }
  },
  data() {
    return {
      password1: "",
      password2: "",
      message: ""
    }
  },
  methods: {
    submit() {
      if(this.password1 === this.password2) {
        this.$store.dispatch("changePassword", {
          password: this.password1
        })
      } else {
        this.message = "As senhas não correspondem";
      }
    }
  },
};
</script>
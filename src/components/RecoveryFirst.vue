<template>
  <div>
    <v-form v-model="valid" v-on:submit.prevent="fetchUser">
      <v-text-field
        label="Seu apelido no Haxball"
        v-model="haxball_user"
        :rules="haxballUserRules"
        autocomplete="off"
      />
      <v-text-field label="Tag no Discord" v-model="tag" :rules="tagRules" autocomplete="off" />
      <div style="justify-content: center; display: flex">
        <div style="margin-top: 1em; margin: 10px">
          <v-btn to="/login" style="background-color: #4CAF50; color: white;">Voltar</v-btn>
          <v-btn
            style="background-color: rebeccapurple; color: white;"
            type="submit"
            :disabled="valid ? false : true"
          >Enviar</v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "RecoveryFirst",
  data() {
    return {
      valid: false,
      haxball_user: "",
      haxballUserRules: [
        v => !!v || "Você precisa colocar o seu apelido do Haxball."
      ],
      tagRules: [
        v => !!v || "Você precisa colocar a sua tag que você usa no Discord."
      ],
      tag: ""
    };
  },
  methods: {
    fetchUser() {
      this.$store.dispatch("existsUser", {
        haxballUser: this.haxball_user,
        discordTag: this.tag
      });
    }
  }
};
</script>
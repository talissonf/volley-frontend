<template>
  <div>
    <v-card class="mx-auto card-home" max-width="400" :elevation="5">
      <RecoveryFirst v-if="this.$store.state.recoveryPhase === 1" />
      <RecoverySecond v-else-if="this.$store.state.recoveryPhase === 2" />
      <RecoveryThird v-else-if="this.$store.state.recoveryPhase === 3" />
    </v-card>
  </div>
</template>

<script>
import RecoveryFirst from "../components/RecoveryFirst";
import RecoverySecond from "../components/RecoverySecond";
import RecoveryThird from "../components/RecoveryThird";

export default {
  name: "Recovery",
  components: {
    RecoveryFirst,
    RecoverySecond,
    RecoveryThird
  }
};
</script>

<style scoped>
.card-home {
  width: 90%;
  text-align: center;
  padding: 2em;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
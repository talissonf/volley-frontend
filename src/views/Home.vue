<template>
  <div>
    <v-card v-if="user" class="mx-auto card-home" max-width="5000" loading :elevation="5">
      <v-card-title style="text-align: left">
        {{ user.nickname }}
        <v-chip color="#1E88E5" style="margin-left: 10px; color: white">{{ adminLevel }}</v-chip>
        <v-chip color="#DDFF00" v-if="user.vip">VIP</v-chip>
      </v-card-title>
      <div class="card-content" style="width: 100%;" v-if="user">
        <v-container fluid>
          <v-simple-table fixed-header style="min-width: 100%" height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bloqueios</td>
                  <td>{{ user.stats.bloqueios }}</td>
                </tr>
                <tr>
                  <td>Cortes</td>
                  <td>{{ user.stats.cortes }}</td>
                </tr>
                <tr>
                  <td>Levantamentos</td>
                  <td>{{ user.stats.levantamentos }}</td>
                </tr>
                <tr>
                  <td>Vitórias seguidas</td>
                  <td>{{ user.stats.vSeguidas }}</td>
                </tr>
                <tr>
                  <td>Vitórias</td>
                  <td>{{ user.stats.vitorias }}</td>
                </tr>
                <tr>
                  <td>Derrotas</td>
                  <td>{{ user.stats.derrotas }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-chip :color="eloColor" label style="padding: 1em; color: white">{{ elo }}</v-chip>
        </v-container>
      </div>
      <v-btn
        color="#FF1744"
        style="color: white; width: 25%; text-align: right; margin-bottom: 1em"
        @click="logout"
      >Sair</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      localStorage.removeItem("token");

      window.location.reload();
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    elo() {
      if (this.user.stats.elo <= 49) {
        return "Bronze I";
      } else if (this.user.stats.elo >= 50 && this.user.stats.elo <= 99) {
        return "Bronze II";
      } else if (this.user.stats.elo >= 100 && this.user.stats.elo <= 149) {
        return "Bronze III";
      } else if (this.user.stats.elo >= 150 && this.user.stats.elo <= 214) {
        return "Prata I";
      } else if (this.user.stats.elo >= 215 && this.user.stats.elo <= 279) {
        return "Prata II";
      } else if (this.user.stats.elo >= 280 && this.user.stats.elo <= 349) {
        return "Prata III";
      } else if (this.user.stats.elo >= 350 && this.user.stats.elo <= 429) {
        return "Ouro I";
      } else if (this.user.stats.elo >= 430 && this.user.stats.elo <= 509) {
        return "Ouro II";
      } else if (this.user.stats.elo >= 510 && this.user.stats.elo <= 599) {
        return "Ouro III";
      } else if (this.user.stats.elo >= 600 && this.user.stats.elo <= 699) {
        return "Diamante I";
      } else if (this.user.stats.elo >= 700 && this.user.stats.elo <= 799) {
        return "Diamante II";
      } else if (this.user.stats.elo >= 800 && this.user.stats.elo <= 999) {
        return "Diamante III";
      } else if (this.user.stats.elo >= 1000 && this.user.stats.elo <= 1999) {
        return "Místico";
      } else if (this.user.stats.elo >= 2000) {
        return "Lenda";
      }
    },
    eloColor() {
      if (this.user.stats.elo < 50 || this.user.stats.elo < 100 || this.user.stats.elo < 150) {
        return '#964b00';
      } else if (this.user.stats.elo < 215 || this.user.stats.elo < 280 || this.user.stats.elo < 350) {
        return '#d5d5d5';
      } else if (this.user.stats.elo < 430 || this.user.stats.elo < 510 || this.user.stats.elo < 600) {
        return '#ffd700';
      } else if (this.user.stats.elo < 700 || this.user.stats.elo < 800 || this.user.stats.elo < 1000) {
        return '#e60073';
      } else if (this.user.stats.elo < 2000) {
        return '#00b300';
      } else {
        return '#6600cc';
      }
    },
    adminLevel() {
      if (this.user.adminLevel === 0) {
        return "Jogador";
      } else if (this.user.adminLevel === 1) {
        return "Moderador";
      } else if (this.user.adminLevel === 2) {
        return "Administrador";
      }
    }
  },
  beforeCreate() {
    let { isAuthenticated } = this.$store.getters;

    if (!isAuthenticated) {
      this.$router.push("/login");
    } else {
      this.$store.dispatch("fetchUser");
    }
  }
};
</script>

<style scoped>
.card-home {
  width: 90%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.card-content {
  padding: 1em;
}

.stats {
  margin: 1em;
  width: 100%;
}
</style>
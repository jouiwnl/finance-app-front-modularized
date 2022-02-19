<template>
  <div>
    <v-container class="wrapper-form">
      <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <h1 class="mb-3 text-center">
          {{ email.id ? 'Editing' : 'Registering email'}} <v-badge v-if="email.id" :content="email.id" color="blue">e-mail</v-badge>
        </h1>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4">
          <v-text-field v-model="email.nome" label="Name" :rules="rules.text" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4">
          <v-text-field v-model="email.email" label="Email" :rules="rules.email" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4" class="buttons-group">
          <v-btn v-on:click="$router.back()" depressed>Cancel</v-btn>
          <v-btn 
              :disabled="!email.nome || !email.email" 
              v-on:click="salvar(email)"
              depressed 
              color="primary"
            >Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmailService from '../services/EmailService';
import rules from '../../../rules/rules';

export default {
  name: "Partner",

  data: () => ({
    email: {},
    isLoading: false,
    rules: rules,
  }),

  async created() {
    if (!this.$route.params.id.match('regis')) {
      this.isLoading = true;
      EmailService.findById(this.$route.params.id).then(response => {
        this.email = response.data;
        this.isLoading = false;
      }).catch(err => {
        this.$vToastify.error({
          title: 'Error!',
          body: 'An error ocurred! Please try again!',
          canTimeout: true,
          duration: 2000
        });
      });
    }
  },

  methods: {
    async salvar(email) {
      this.isLoading = true;
      if (email.id) {
        EmailService.update(email, email.id).then(response => {
          this.$vToastify.success({
            title: 'Success!',
            body: 'Operation success.',
            canTimeout: true,
            duration: 2000
          });
          this.isLoading = false;
          this.$router.push({ path: '/emails' });
        }).catch(err => {
          this.$vToastify.error({
            title: 'Error!',
            body: 'An error ocurred! Please try again!',
            canTimeout: true,
            duration: 2000
          });
        });
      } else {
        EmailService.create(email).then(response => {
          this.$vToastify.success({
            title: 'Success!',
            body: 'Operation success.',
            canTimeout: true,
            duration: 2000
          });
          this.isLoading = false;
          this.$router.push({ path: '/emails' });
        }).catch(err => {
          this.$vToastify.error({
            title: 'Error!',
            body: 'An error ocurred! Please try again!',
            canTimeout: true,
            duration: 2000
          });
        });
      }
    },
  }

};
</script>

<style scoped>

  .buttons-group {
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    margin-top: 30px;
  }

  .wrapper-form {
    justify-content: center;
  }

</style>

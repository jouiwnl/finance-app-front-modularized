<template>
  <div>
    <v-container class="wrapper-form">
      <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <h1 class="mb-3 text-center">
          {{ partner.id ? 'Editing' : 'Registering partner'}} <v-badge v-if="partner.id" :content="partner.id" color="blue">partner</v-badge>
        </h1>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4">
          <v-text-field v-model="partner.nome" label="Name" :rules="rules" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4">
          <v-text-field v-model="partner.email" label="Email" :rules="rules" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isLoading" justify="center">
        <v-col sm="4" class="buttons-group">
          <v-btn to='/partners' depressed>Cancel</v-btn>
          <v-btn 
              :disabled="!partner.nome || !partner.email" 
              v-on:click="salvar(partner)"
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
import PartnerService from '../services/PartnerService';

export default {
  name: "Partner",

  data: () => ({
    partner: {},
    isLoading: false,
    rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),

  async created() {
    if (!this.$route.params.id.match('regis')) {
      this.isLoading = true;
      PartnerService.findById(this.$route.params.id).then(response => {
        this.partner = response.data;
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
    async salvar(partner) {
      this.isLoading = true;
      if (partner.id) {
        PartnerService.update(partner, partner.id).then(response => {
          this.$vToastify.success({
            title: 'Success!',
            body: 'Operation success.',
            canTimeout: true,
            duration: 2000
          });
          this.isLoading = false;
          this.$router.push({ path: '/partners' });
        }).catch(err => {
          this.$vToastify.error({
            title: 'Error!',
            body: 'An error ocurred! Please try again!',
            canTimeout: true,
            duration: 2000
          });
        });
      } else {
        PartnerService.create(partner).then(response => {
          this.$vToastify.success({
            title: 'Success!',
            body: 'Operation success.',
            canTimeout: true,
            duration: 2000
          });
          this.isLoading = false;
          this.$router.push({ path: '/partners' });
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

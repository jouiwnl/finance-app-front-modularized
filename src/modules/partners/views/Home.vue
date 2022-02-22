<template>
  <div style="padding: 20px;">
    <v-row justify="space-between" align="center">
      <h1 class="mb-3">Partners</h1>
      <div>
        <v-btn color="primary" plain v-on:click="init()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn depressed color="primary" to="partners/register">
          <v-icon small class="pull-right">mdi-plus</v-icon> Partner
        </v-btn>
      </div>
    </v-row>
    
    <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-row v-if="!partners.length && !isLoading" justify="center" no-gutters class="my-12">
      <v-alert dense type="info">
        No partners registered.
      </v-alert>
    </v-row>

    <v-row v-if="partners.length">
      <v-col sm="4" v-for="partner in partners" :key="partner.id">
        <v-card :disabled="partner.situacao == 'DEACTIVADED'">
          <v-card-title>
            {{ partner.nome }}
          </v-card-title>
          <v-card-subtitle>
            <small>({{partner.email}})</small>
          </v-card-subtitle>
          <v-card-actions v-if="partner.situacao != 'DEACTIVADED'">
            <v-spacer />
            <v-btn :to="`/partners/${partner.id}`" depressed>
              Edit
            </v-btn>
            <v-btn depressed color="error" v-on:click="inactive(partner.id)">
              Inactive
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="partner.situacao == 'DEACTIVADED'">
            <v-btn depressed color="error">
              DEACTIVADED
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PartnerService from "../services/PartnerService";
import CreateToast from '../../../utils/createToast';

export default {
  name: "Home",

  data: () => ({
    partners: [],
    isLoading: true
  }),

  async created() {
    this.init()
  },

  methods: {
    async init() {
      this.isLoading = true;
      this.partners = [];

      PartnerService.findAll().then(response => {
        this.partners = response.data;
        this.partners = this.partners.sort();
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      }).finally(() => {
        this.isLoading = false;
      }); 
    },

    inactive(idPartner) {
      this.$confirm(`This action will deactivate all loans related to this registration (this action cannot be undone). Do you wish to continue?`).then(response => {
        if (response) {
          PartnerService.inactive(idPartner).then(() => {
            CreateToast.createToastSuccess('Operation success.');
            this.init();
          }).catch(err => {
            CreateToast.createToastFailed('An error ocurred! Please try again!');
          });
        }
      });
    }
  }
};
</script>

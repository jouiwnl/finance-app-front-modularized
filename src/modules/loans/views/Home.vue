<template>
  <div>
    <v-row justify="space-between" align="center">
      <h1 class="mb-3">Loans</h1>
      <div>
        <v-btn color="primary" plain v-on:click="init()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn depressed color="primary" to="loans/register">
          <v-icon small class="pull-right">mdi-plus</v-icon> Register loan
        </v-btn>
      </div>
    </v-row>
    
    <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-row v-else-if="!loans.length && !isLoading" justify="center" no-gutters class="my-12">
      <v-alert dense type="info">
        No loans registered.
      </v-alert>
    </v-row>

    <v-row v-else-if="loans.length">
      <v-col sm="4" v-for="loan in loans" :key="loan.id">
        <v-card :disabled="loan.situacao == 'DEACTIVADED' || loan.situacao == 'PAID'">
          <v-card-title>
            {{ loan.stockId }}
          </v-card-title>
          <v-card-subtitle>
            <small>({{loan.nomeCarro}})</small>
          </v-card-subtitle>
          <v-card-actions v-if="loan.situacao != 'DEACTIVADED'">
            <v-spacer />
            <v-btn :to="`/loans/${loan.id}`" depressed>
              View loan
            </v-btn>
            <v-btn depressed color="error" v-on:click="inactive(loan.id)">
              Inactive
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="loan.situacao == 'DEACTIVADED'">
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

import LoanService from '../services/LoanService';

export default {
  name: "Home",

  data: () => ({
    loans: [],
    isLoading: false
  }),

  async created() {
    this.init()
  },

  methods: {
    async init() {
      this.loans = [];
      LoanService.findAll().then(response => {
        this.loans = response.data;
        this.loans = this.loans.sort();
        this.isLoading = false;
      }).catch(err => {
        this.$vToastify.error({
          title: 'Error!',
          body: 'An error ocurred! Please try again!',
          canTimeout: true,
          duration: 2000
        });
      });
    },

    inactive(idLoan) {
      this.$confirm(`This action will deactivate this register (this action cannot be undone). Do you wish to continue?`).then(response => {
        if (response) {
          LoanService.inactive(idLoan).then(() => {
            this.$vToastify.success({
              title: 'Success!',
              body: 'Operation success.',
              canTimeout: true,
              duration: 2000
            });
            this.init();
          }).catch(err => {
            this.$vToastify.error({
              title: 'Error!',
              body: 'An error ocurred! Please try again!',
              canTimeout: true,
              duration: 2000
            });
          });
        }
      });
    }
  }
};
</script>

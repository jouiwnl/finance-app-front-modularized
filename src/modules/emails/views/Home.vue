<template>
  <div style="padding: 20px;">
    <v-row justify="space-between" align="center">
      <h1 class="mb-3">Emails</h1>
      <div>
        <v-btn color="primary" plain v-on:click="init()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn depressed color="primary" to="emails/register">
          <v-icon small class="pull-right">mdi-plus</v-icon> E-mail
        </v-btn>
      </div>
    </v-row>
    
    <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-row v-if="!emails.length && !isLoading" justify="center" no-gutters class="my-12">
      <v-alert dense type="info">
        No emails registered.
      </v-alert>
    </v-row>

    <v-row v-if="emails.length">
      <v-col sm="4" v-for="email in emails" :key="email.id">
        <v-card>
          <v-card-title>
            {{ email.nome }}
          </v-card-title>
          <v-card-subtitle>
            <small>({{email.email}})</small>
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <v-btn :to="`/emails/${email.id}`" depressed>
              Edit
            </v-btn>
            <v-btn depressed color="error" v-on:click="remove(email.id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateToast from '../../../utils/createToast';
import EmailService from "../services/EmailService";

export default {
  name: "Home",

  data: () => ({
    emails: [],
    isLoading: true
  }),

  async created() {
    this.init()
  },

  methods: {
    async init() {
      this.isLoading = true;
      this.emails = [];

      EmailService.findAll().then(response => {
        this.emails = response.data;
        this.emails = this.emails.sort();
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      }).finally(() => {
        this.isLoading = false;
      }); 
    },

    remove(emailId) {
      this.$confirm(`This action will deactivate this register (this action cannot be undone). Do you wish to continue?`).then(response => {
          if (response) {
            EmailService.delete(emailId).then(response => {
              CreateToast.createToastSuccess('Operation success.');
              this.init();
            }).catch(err => {
              CreateToast.createToastFailed('An error ocurred! Please try again!');
            });
          } 
      })
      
    }
  }
};
</script>

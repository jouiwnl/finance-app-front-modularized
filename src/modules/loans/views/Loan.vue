<template>
  <div>
    <v-container>
      <v-row v-if="!isLoading" justify="center" :disabled="isEditing">
        <h1 class="mb-3 text-center">
          {{ loan.id ? 'Viewing' : 'Registering Loan'}} <v-badge v-if="loan.id" :content="loan.stockId" color="blue">loan</v-badge>
        </h1>
      </v-row>
    </v-container>
 
    <v-row v-if="isLoading" justify="center" no-gutters class="my-12" :disabled="isEditing">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-container v-if="!isLoading" class="wrapper-form">
      <v-row justify="center" :disabled="isEditing">
        <v-col sm="3">
          <v-text-field v-model="loan.stock" label="# Stock" :rules="rules.number" hide-details="auto"></v-text-field>
        </v-col>

        <v-col sm="3">
          <v-text-field v-model="loan.lastName" label="Last name" :rules="rules.text" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col sm="3">
          <span>Partner</span>
          <model-list-select :list="partners"
                      v-model="loan.idBanco"
                      option-value="id"
                      option-text="nome"
                      placeholder="Partners">
          </model-list-select>
        </v-col>
        <v-col sm="3">
          <v-text-field v-model="loan.nomeCarro" label="Product" :rules="rules.text" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-container>
        <h3 class="mb-3 text-center" style="margin-top: 15px;">
          Loan Disclosures
        </h3>
      </v-container>

      <v-row justify="center" align="center" :disabled="isEditing">
        <v-col sm="4">
          <span>Loan contract date</span> <br>
          <date-picker style="width: 100% !important;" v-model="loan.dataInicioContrato" valueType="format"></date-picker>
        </v-col>
      </v-row>

      <v-row justify="center" align="center" :disabled="isEditing">
        <v-col sm="4">
          <span>Payments Start Date</span> <br>
          <date-picker style="width: 100% !important;" v-model="loan.dataPagamentoParcela" valueType="format"></date-picker>
        </v-col>
      </v-row>

      <v-row justify="center" style="margin-top: 15px;" :disabled="isEditing">
        <v-col sm="4">
          <v-text-field v-model="loan.percJuros" type="number" label="APR %" :rules="rules.number" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center" style="margin-top: 15px;" :disabled="isEditing">
        <v-col sm="4">
          <v-text-field v-model="loan.valorParcela" type="number" label="Payment $" :rules="rules.number" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center" style="margin-top: 15px;" :disabled="isEditing">
        <v-col sm="4">
          <v-text-field v-model="loan.totalPagar" label="Total Loan Amount $" :rules="rules.number" hide-details="auto"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col sm="4" class="buttons-group">
          <v-btn v-on:click="$router.back()" depressed>Cancel</v-btn>
          <v-btn 
              :disabled="!loan.valorParcela || 
                        !loan.percJuros || 
                        !loan.dataPagamentoParcela || 
                        !loan.dataInicioContrato || 
                        !loan.idBanco ||
                        !loan.totalPagar ||
                        !loan.lastName ||
                        !loan.nomeCarro ||
                        !loan.stock ||
                        isEditing"
              v-on:click="salvar(loan)"
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
import LoanService from '../services/LoanService';
import PartnerService from '../../partners/services/PartnerService';
import moment from 'moment';
import { ModelListSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';
import rules from '../../../rules/rules';
import CreateToast from '../../../utils/createToast';

export default {
  name: "Loan",
  components: {
    ModelListSelect,
    DatePicker
  },
  data: () => ({
    loan: {
      dataInicioContrato: moment().format('YYYY-MM-DD'),
      dataPagamentoParcela: moment().format('YYYY-MM-DD'),
      percJuros: 15,
      rules: rules
    },
    partners: [],
    isLoading: false,
    isEditing: false,
    rules: rules
  }),

  async created() {
    PartnerService.findAll().then(response => {
      if (response.data) {
        this.partners = response.data.filter(partner => partner.situacao != 'DEACTIVADED')
      }
    });

    if (!this.$route.params.id.match('regis')) {
      this.isLoading = true;
      this.isEditing = true;
      LoanService.findById(this.$route.params.id).then(response => {
        this.loan = response.data;
        this.isLoading = false;
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      });
    }
  },

  methods: {
    async salvar(loan) {
      this.isLoading = true;
      if (loan) {
        LoanService.create(loan).then(response => {
          CreateToast.createToastSuccess('Operation success.');
          this.isLoading = false;
          this.$router.push({ path: '/loans' });
        }).catch(err => {
          CreateToast.createToastFailed('An error ocurred! Please try again!');
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

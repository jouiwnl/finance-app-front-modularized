<template>
  <div>
    <v-row justify="center" style="margin-top: 15px;">
      <h1 class="mb-3 text-center">Find loans</h1>
    </v-row>

    <v-container class="text-center">
      <v-row align="center" justify="center">
        <v-col sm>
          <span>Partner</span>
          <model-list-select :list="partners"
                      v-model="finder.partner"
                      option-value="nome"
                      option-text="nome"
                      placeholder="select item">
          </model-list-select>
        </v-col>
        
        <v-col sm>
          <span>Situation</span>
          <model-list-select :list="options"
                      v-model="finder.situation"
                      option-value="value"
                      option-text="value"
                      placeholder="select item">
          </model-list-select>
        </v-col>

        <v-col sm>
          <span>Start date</span> <br>
          <date-picker v-model="finder.startDate" valueType="format"></date-picker>
        </v-col>

        <v-col sm>
          <span>End date</span> <br>
          <date-picker v-model="finder.endDate" valueType="format"></date-picker>
        </v-col>

        <v-col sm="1">
          <v-btn style="margin-top: 22px;" depressed color="primary" v-on:click="executeSearch(finder)">
            Search
          </v-btn>
        </v-col> 
      </v-row>
    </v-container>
    
    <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-row v-if="!loans.length && !isLoading" justify="center" no-gutters class="my-12">
      <v-alert dense type="info">
        Not found any loans with the select filters.
      </v-alert>
    </v-row>

    <v-row justify="center" style="margin-top: 10px;">
      <v-simple-table
        fixed-header
        height="350px"
        v-if="!isLoading && loans.length"
        style="width: 100%;"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th scope="col" class="text-center">Partner</th>
              <th scope="col" class="text-center">Stock</th>
              <th scope="col" class="text-center">#</th>
              <th scope="col" class="text-center">Days</th>
              <th scope="col" class="text-center" style="width: 120px;">Due date</th>
              <th scope="col" class="text-center">Interest</th>
              <th scope="col" class="text-center">Principal</th>
              <th scope="col" class="text-center">Payment</th>
              <th scope="col" class="text-center">Principal payment</th>
              <th scope="col" class="text-center">Principal balance</th>
              <th scope="col" class="text-center">Status</th>
              <th scope="col" class="text-center" style="width: 120px;">Paid date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="loan in loans"
              :key="loan.id"
            >
              <td class="text-center"><a v-on:click="loadPartner(loan.contrato.banco.id)">{{ loan.contrato.banco.nome }}</a></td>
              <td class="text-center"><a v-on:click="loadLoan(loan.contrato.id)">{{ loan.contrato.stockId }}</a></td>
              <td class="text-center">{{ loan.nroParcela }}/{{ loan.contrato.qtdeParcelas }}</td>
              <td class="text-center">{{ loan.diasPrimeiraParcela ? loan.diasPrimeiraParcela : loan.diasProximaParcela }}</td>
              <td class="text-center">{{ loan.dataPagamento }}</td>
              <td class="text-center">${{ loan.vlParcelaJuros.toFixed(2) }}</td>
              <td class="text-center">${{loan.contrato.totalPagar.toFixed(2)}}</td>
              <td class="text-center">${{loan.vlParcela.toFixed(2)}}</td>
              <td class="text-center">${{ (loan.vlParcela - loan.vlParcelaJuros).toFixed(2)}}</td>
              <td class="text-center">${{ (loan.contrato.totalPagar - loan.vlParcela).toFixed(2)}}</td>
              <td class="text-center">{{loan.situacao}}</td>
              <td class="text-center">
                  {{loan.dataPagamentoPaga}}
                  <span v-if="loan.situacao != 'PAID' && loan.situacao != 'DEACTIVADED'">
                      <input type="checkbox" v-on:click="checkLoanForPay(loan)">
                      Pay
                  </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row style="margin-top: 5px;" align="center" justify="center" v-if="loans.length && !isLoading">
        <v-col sm="3">
          <strong>Total Loans: </strong> {{loans.length}}
        </v-col>

        <v-col sm="3">
          <strong>Total Interest: </strong> ${{totalInterests.toFixed(2)}}
        </v-col>

        <v-col sm="3">
          <strong>Total Payments: </strong> ${{totalPayments.toFixed(2)}}
        </v-col>
        
        <v-col sm="1" v-if="loansList.length">
          <v-btn depressed color="primary" v-on:click="bulkPay(loansList)">
            Bulk pay
          </v-btn>
        </v-col>  
      </v-row>
    </v-row>
    
  </div>
</template>

<script>
import moment from 'moment';
import { ModelListSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';
import ParcelaService from "../services/ParcelaService";
import PartnerService from "../../partners/services/PartnerService";
import _ from 'lodash';
import LoanService from '../../loans/services/LoanService';
import CreateToast from '../../../utils/createToast';

export default {
  name: "Home",
  components: {
    ModelListSelect,
    DatePicker
  },
  data: () => ({
    loans: [],
    partners: [{ nome: 'All' }],
    partner: {},
    finder: { 
        startDate: moment().format('YYYY-MM-DD'), 
        endDate: moment().format('YYYY-MM-DD'),
        situation: "All",
        partner: "All"
    },
    isLoading: false,
    options: [
      { id: 1, value: 'All' },
      { id: 2, value: 'UNPAID' },
      { id: 3, value: 'PAID' },
      { id: 4, value: 'DEACTIVADED' }
    ],
    loansList: [],
    totalPayments: 0.0,
    totalInterests: 0.0
  }),
  created() {
    this.init()
  },

  methods: {
    async init() {
      this.isLoading = true;
      this.loans = [];
      this.partners = [{ nome: 'All' }];
      PartnerService.findAll().then(response => {
        response.data.map(result => {
          this.partners.push(result);
        });
        this.isLoading = false;
        this.partners = this.partners.filter(partner => partner.situacao != 'DEACTIVADED').sort();
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      });
    },

    async executeSearch(finder) {
      this.isLoading = true;
      ParcelaService.buscaAvancada(
          finder.partner, 
          finder.situation, 
          finder.startDate, 
          finder.endDate
      ).then((response) => {
          this.loans = response.data;
          this.totalPayments = _.sumBy(this.loans, 'vlParcela');
          this.totalInterests = _.sumBy(this.loans, 'vlParcelaJuros')
      }).finally(() => {
          this.isLoading = false;
      }); 
    },

    loadPartner(idBanco) {
      this.$router.push(`/partners/${idBanco}`);
    },

    loadLoan(idLoan) {
      this.$router.push(`/loans/${idLoan}`);
    },

    checkLoanForPay(loan) {
      if (this.loansList.some(value => value.id == loan.id)) {
        _.remove(this.loansList, (item) => {
          return item.id == loan.id
        });

        this.$forceUpdate(this.loansList);
      } else {
        this.loansList.push(loan);
      }
    },

    bulkPay(loansList) {
      if (this.checkMoreThanOnePartner(loansList)) {
        this.isLoading = true;
        CreateToast.createToastInfo('Payment in process!', 'Sending emails to partners to verify your paid loans.');

        let nrosParcelas = [];

        loansList.map(loan => {
          nrosParcelas.push(loan.nroParcela);
        })
        
        LoanService.pay(loansList[0].contrato.id, nrosParcelas).then(response => {
          CreateToast.createToastSuccess('Payments processed with success.');
        }).then(() => {
          this.isLoading = false;
          this.init();
        }).catch(err => {
          CreateToast.createToastFailed('An error ocurred! Please try again!');
        });

        this.$forceUpdate(this.loans);
        this.$forceUpdate(this.partners);
      }
    },

    checkMoreThanOnePartner(loanList) {
      let newList = _.uniqBy(loanList, (loan) => {
        return loan.idContrato;
      });

      console.log(newList)

      if (newList.length > 1) {
        CreateToast.createToastWarning(`It's not possible pay two different partners at the same time. Please, use filters to find and pay separately!`);
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
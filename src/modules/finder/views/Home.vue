<template>
  <div>
    <v-container class="text-center">
      <h1 class="mb-3 text-center">Find loans</h1>
      <v-row align="center">
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
        <v-col>
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

    <v-simple-table
      fixed-header
      height="700px"
      v-if="!isLoading && loans.length"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th scope="col" class="text-center">Partner</th>
            <th scope="col" class="text-center">Stock</th>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">Days</th>
            <th scope="col" class="text-center">Due date</th>
            <th scope="col" class="text-center">Interest</th>
            <th scope="col" class="text-center">Principal</th>
            <th scope="col" class="text-center">Payment</th>
            <th scope="col" class="text-center">Principal payment</th>
            <th scope="col" class="text-center">Principal balance</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Paid date</th>
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
            <td class="text-center">juros</td>
            <td class="text-center">{{loan.contrato.totalPagar.toFixed(2)}}</td>
            <td class="text-center">{{loan.vlParcela.toFixed(2)}}</td>
            <td class="text-center">{{loan.vlParcela.toFixed(2)}}</td>
            <td class="text-center">{{loan.contrato.totalPagar.toFixed(2)}}</td>
            <td class="text-center">{{loan.situacao}}</td>
            <td class="text-center">
                {{loan.dataPagamentoPaga}}
                <span v-if="loan.situacao != 'PAID'">
                    <input type="checkbox" v-on:click="teste($event, loan)">
                    Pay
                </span>
                
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import moment from 'moment';
import { ModelListSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';
import ParcelaService from "../services/ParcelaService";
import PartnerService from "../../partners/services/PartnerService";

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
      { id: 3, value: 'PAID' }
    ]
  }),
  created() {
    this.init()
  },

  methods: {
    async init() {
      this.isLoading = true;
      PartnerService.findAll().then(response => {
        response.data.map(result => {
          this.partners.push(result);
        });
        this.isLoading = false;
        this.partners = this.partners.filter(partner => partner.situacao != 'DEACTIVADED').sort();
      }).catch(err => {
        this.$vToastify.error({
          title: 'Error!',
          body: 'An error ocurred! Please try again!',
          canTimeout: true,
          duration: 2000
        });
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

    teste(event, loan) {
      console.log(loan)
    }
  }
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
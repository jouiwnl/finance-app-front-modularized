<template>
  <div>
    <v-container>
      <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-row>

      <v-row align="center" justify="center" v-if="!isLoading">
        <v-col sm="6">
          <v-card width="600px" height="300px" style="margin-top: 13px;" v-for="partner in partners" :key="partner.id" outlined>
            <v-card-title style="justify-content: center;">
              <h3>{{ partner.nome }} Loans</h3>
            </v-card-title>
            <v-card-subtitle style="text-align: center;">
              <span>150 Total</span> <br>
              <span>75 Unpaid, 75 Paid</span> <br>
              <span>Balance $397,655.13</span>
            </v-card-subtitle>
          </v-card>
        </v-col>

        <v-col sm="6">
          <v-row justify="center">
            <h2>
              Loan Payments Pending
            </h2>
          </v-row>
          <v-row justify="center" style="margin-top: 10px;">
            <v-simple-table
              fixed-header
              height="100%"
              v-if="!isLoading && partners.length"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th scope="col" class="text-center" style="width: 130px;">Stock</th>
                    <th scope="col" class="text-center">Pay #</th>
                    <th scope="col" class="text-center">Due date</th>
                    <th scope="col" class="text-center">Payment</th>
                    <th scope="col" class="text-center">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="loan in loans"
                    :key="loan.id"
                  >
                    <td class="text-center"><a v-on:click="loadLoan(loan.contrato.id)">{{ loan.contrato.stockId }}</a></td>
                    <td class="text-center">{{ loan.nroParcela }}/{{ loan.contrato.qtdeParcelas }}</td>
                    <td class="text-center">13/07/2022</td>
                    <td class="text-center">3.00</td>
                    <td class="text-center">Balance</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>

import PartnerService from '../modules/partners/services/PartnerService';
import ParcelaService from '../modules/finder/services/ParcelaService';
import _ from 'lodash';

export default {
  name: "Home",
  data() {
    return {
      partners: [],
      loans: [],
      isLoading: false
    }
  },

  async created() {
    this.init();
  },

  methods: {
    init() {
      this.isLoading = true;
      PartnerService.findAll().then(response => {
        this.partners = response.data;

        ParcelaService.buscaAvancada().then(responseLoan => {
          this.loans = responseLoan.data;
        }).then(() => {
          _.remove(this.loans, (item) => {
            return item.situacao == 'PAID'
          });

          this.isLoading = false;
        });
      }).catch(err => {
        this.$vToastify.error({
          title: 'Error!',
          body: 'An error ocurred! Please try again!',
          canTimeout: true,
          duration: 2000
        });
      });
    },

    loadLoan(idLoan) {
      this.$router.push(`/loans/${idLoan}`);
    }
    
  }
};
</script>

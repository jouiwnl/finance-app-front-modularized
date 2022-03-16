<template>
  <div>
    <v-container>

      <v-container v-if="isLoading">
        <v-row justify="center" no-gutters class="my-12">
          <v-progress-circular indeterminate color="primary" size="64" />
        </v-row>

        <v-row justify="center">
          <span>Loading your Dashboard, please wait!</span>
        </v-row>

        <v-row justify="center" style="margin-top: 8px;">
          <span>This may gonna take a while.</span>
        </v-row>
      </v-container>

      <v-row align="center" justify="center" v-if="!isLoading">
        <v-col sm="6">
          <v-card width="600px" height="350px" style="margin-top: 13px;" v-for="partner in partners" :key="partner.id" outlined>
            <v-card-title style="justify-content: center;">
              <h3>{{ partner.nome }} Loans</h3>
            </v-card-title>
            <v-card-subtitle style="text-align: center;">
              <span>{{partner.totalReports}} Total</span> <br>
              <span>{{partner.totalReportsUnpaid}} Unpaid, {{partner.totalReportsPaid}} Paid, {{partner.totalReportsInactives}} Inactives</span> <br>
              <span>Balance $ {{partner.valorTotalReports ? partner.valorTotalReports.toFixed(2) : 0}}</span>
            </v-card-subtitle>
            <v-container style="padding-left: 25px; padding-right: 25px;">
              <v-progress-linear
                color="blue"
                height="20"
                v-bind:value="(partner.totalReportsPaid * 100)/partner.totalReports"
                style="border-radius: 4px;"
              ></v-progress-linear>
            </v-container>
            <v-row justify="center" style="margin-top: 20px;">
              <v-btn color="primary" width="200px" depressed v-on:click="calculatePayoff(partner.id)">
                Calculate pay-off
              </v-btn>
            </v-row>

            <v-row justify="center" style="margin-top: 20px;">
              <v-btn color="primary" v-on:click="loadPartnerNextWeekPayments(partner)" width="200px" depressed>
                Payments Next Week
              </v-btn>
            </v-row>

            <v-row justify="center" style="margin-top: 20px;">
              <v-btn color="error" v-on:click="loadPartnerThisWeekPayments(partner)" width="200px" depressed>
                Payments This Week
              </v-btn>
            </v-row>
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
              height="650px"
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
                    <td class="text-center">{{loan.contrato.dataInicioContrato}}</td>
                    <td class="text-center">${{loan.vlParcela.toFixed(2)}}</td>
                    <td class="text-center">${{(loan.contrato.totalPagar - loan.vlParcela).toFixed(2)}}</td>
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
import CreateToast from '../utils/createToast';
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
        this.partners = _.remove(response.data, (item) => {
          return item.situacao == 'ACTIVE'
        });

        ParcelaService.thisweekpayments().then(responseLoan => {
          this.loans = _.remove(responseLoan.data, (item) => {
            return item.situacao == 'UNPAID'
          });
        }).catch(err => {
          CreateToast.createToastFailed('An error ocurred! Please try again!');
        }).finally(() => {
          this.isLoading = false;
        });
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      }).finally(() => {
        this.isLoading = false;
      });
    },

    loadLoan(idLoan) {
      this.$router.push(`/loans/${idLoan}`);
    },

    loadPartnerThisWeekPayments(partner) {
      this.isLoading = true;
      ParcelaService.thisweekpayments(partner.id).then(responseLoan => {
        this.loans = _.remove(responseLoan.data, (item) => {
          return item.situacao == 'UNPAID'
        });
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      }).finally(() => {
        this.isLoading = false;
      });
    },

    loadPartnerNextWeekPayments(partner) {
      this.isLoading = true;
      ParcelaService.nextweekpayments(partner.id).then(responseLoan => {
        this.loans = _.remove(responseLoan.data, (item) => {
          return item.situacao == 'UNPAID'
        });
      }).catch(err => {
        CreateToast.createToastFailed('An error ocurred! Please try again!');
      }).finally(() => {
        this.isLoading = false;
      });
    },

    calculatePayoff(partnerId) {
      this.$router.push(`/calculatePayoff/${partnerId}`);
    }
    
  }
};
</script>

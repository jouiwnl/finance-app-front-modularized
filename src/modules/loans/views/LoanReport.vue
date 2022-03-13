<template>
    <div>
        <v-row v-if="isLoading" justify="center" no-gutters class="my-12">
            <v-progress-circular indeterminate color="primary" size="64" />
        </v-row>

        <v-row justify="space-between">
            <v-col sm="3" style="text-align: center;">
                <v-icon v-on:click="$router.back()">
                    mdi-arrow-left
                </v-icon>
            </v-col>

            <v-col sm="3" style="text-align: center;">
                <v-btn v-on:click="print()" depressed>
                    <v-icon>
                        mdi-printer
                    </v-icon>
                    Print Report
                </v-btn>
                
            </v-col>
        </v-row>

        <v-container class="wrapper-report" v-if="!isLoading" id="printer-wrapper" style="margin-top: 30px;">
            <v-row justify="center" class="header-options" style="justify-content: center; align-items: center;">
                <v-col style="text-align: center;">
                    <h1 style="font-size: 2.7rem;">#{{loan.stockId}}</h1>
                </v-col>

                <v-col style="text-align: center;">
                    <v-row align="center">
                        <v-col sm="6">
                            <h2>Partner: 
                                <span style="font-size: 20px;">
                                    <a v-on:click="loadPartner(loan.banco.id)">{{loan.banco.nome}}</a>
                                </span>
                            </h2>
                        </v-col>
                        <v-col sm="6">
                            <h2>Product: 
                                <span style="font-size: 20px;">
                                    {{loan.nomeCarro}}
                                </span>
                            </h2>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row justify="center" class="table" style="margin-top: 20px;">
                <v-simple-table
                    dense
                    v-if="!isLoading"
                    style="width: 100%;"
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th scope="col" class="text-center">Payment No.</th>
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
                        v-for="parcela in loan.parcelas"
                        :key="parcela.id"
                        >
                        <td class="text-center">{{ parcela.nroParcela }}</td>
                        <td class="text-center">{{ parcela.diasPrimeiraParcela ? parcela.diasPrimeiraParcela : parcela.diasProximaParcela }}</td>
                        <td class="text-center">{{ parcela.dataPagamento }}</td>
                        <td class="text-center">${{ parcela.vlParcelaJuros.toFixed(2) }}</td>
                        <td class="text-center">${{(parcela.vlParcela + (parcela.balanceAfterPayment - parcela.valorTotalJurosLoan)).toFixed(2)}}</td>
                        <td class="text-center">${{parcela.vlParcela.toFixed(2)}}</td>
                        <td class="text-center">${{ (parcela.vlParcela - parcela.vlParcelaJuros).toFixed(2)}}</td>
                        <td class="text-center">${{ (parcela.balanceAfterPayment - parcela.valorTotalJurosLoan).toFixed(2)}}</td>
                        <td class="text-center">{{parcela.situacao}}</td>
                        <td class="text-center">{{parcela.dataPagamentoPaga}}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-row>
            <v-row style="text-align: center; margin-top: 30px;">
                <v-col>
                    <strong>Total Loans: </strong> {{loan.parcelas.length}}
                </v-col>

                <v-col>
                    <strong>Total Interest: </strong> ${{totalInterests.toFixed(2)}}
                </v-col>

                <v-col>
                    <strong>Principal Payment: </strong> ${{totalPayments.toFixed(2)}}
                </v-col>

                <v-col>
                    <strong>Total Payment: </strong> ${{ (totalInterests +  totalPayments).toFixed(2)}}
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>;
import CreateToast from '../../../utils/createToast';
import LoanService from '../services/LoanService';

    export default {
        name: "LoanReport",
        data() {
            return {
                isLoading: false,
                loan: {},
                totalInterests: 0.0,
                totalPayments: 0.0
            }
        },
        async created() {
            this.init();
        },

        methods: {
            async init() {
                this.isLoading = true;
                LoanService.findById(this.$route.params.id).then(response => {
                    this.loan = response.data;
                    this.totalPayments = _.sumBy(this.loan.parcelas, 'vlParcela');
                    this.totalInterests = _.sumBy(this.loan.parcelas, 'vlParcelaJuros')
                    console.log(this.loan);

                }).catch(err => {
                    CreateToast.createToastFailed('An error ocurred! Please try again!');
                }).finally(() => {
                    this.isLoading = false;
                });
            },

            print() {
                return this.$htmlToPaper('printer-wrapper');
            },

            loadPartner(idPartner) {
                this.$router.push(`/partners/${idPartner}`);
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
<template>
  <div>
    <v-container>

      <v-container v-if="isLoading">
        <v-row justify="center" no-gutters class="my-12">
          <v-progress-circular indeterminate color="primary" size="64" />
        </v-row>

        <v-row justify="center">
          <span>Calculating pay-off, please wait!</span>
        </v-row>
      </v-container>

			<v-container v-else>
				<v-row align="center" justify="center" style="margin-bottom: 50px;">
					<h2>
						{{partner.nome}} Pay-off Calculation as of {{self.today}}
					</h2>
				</v-row>

				<v-row align="center" justify="center">
					<v-simple-table>
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">
										Stock
									</th>
									<th class="text-left">
										Pay-off Amount
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="loan in loans" :key="loan.id">
									<td><a v-on:click="loadLoan(loan.id)">{{ loan.stockId }}</a></td>
									<td>$ {{ loan.valorTotalDesconto.toFixed(2) }}</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</v-row>
			</v-container>

    </v-container>

  </div>
</template>

<script>

import PartnerService from '../modules/partners/services/PartnerService';
import ParcelaService from '../modules/finder/services/ParcelaService';
import CreateToast from '../utils/createToast';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: "Home",
  data() {
    return {
      loans: [],
			partner: {},
			self: {
				today: moment().format('YYYY-MM-DD')
			},
      isLoading: false
    }
  },

  async created() {
    this.init();
  },

  methods: {
    init() {
      this.isLoading = true;
      ParcelaService.calculatePayoff(this.$route.params.id).then(response => {
				this.loans = response.data;
      }).then(() => {
				PartnerService.findById(this.$route.params.id).then(response => {
					this.partner = response.data;
				}).catch(err => {
				CreateToast.createToastFailed('An error ocurred! Please try again!');
				});
			}).then(() => {
				this.isLoading = false;
			}).catch(err => {
				CreateToast.createToastFailed('An error ocurred! Please try again!');
			});
    },

    loadLoan(idLoan) {
      this.$router.push(`/loans/${idLoan}`);
    }
  }
};
</script>

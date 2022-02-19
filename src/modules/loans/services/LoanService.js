import { http } from '../../../config'

export default {
    findAll: () => {
        return http.get(`contratos`)
    },

    findById: (loanId) => {
        return http.get(`contratos/${loanId}`)
    },

    create: (loan) => {
        return http.post(`contratos`, loan)
    },

    inactive: (idLoan) => {
        return http.patch(`contratos/${idLoan}/inativar`);
    },

    pay: (loanId, listParcelas) => {
        return http.post(`contratos/${loanId}/pagar?nrosParcela=${listParcelas}`)
    }
}
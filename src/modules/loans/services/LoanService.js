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
    }
}
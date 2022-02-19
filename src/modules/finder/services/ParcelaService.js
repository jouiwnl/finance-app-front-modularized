import { http } from '../../../config'

function montarUrlComFiltros(
    partnerName, 
    paymentStatus, 
    initDate, 
    finalDate
) {
    var defaultUrl = `parcelas/buscaAvancada?`;

    if (partnerName && partnerName !== 'All') {
        defaultUrl += `partner=${partnerName}&`
    }

    if (paymentStatus && paymentStatus !== 'All') {
        defaultUrl += `paymentStatus=${paymentStatus}&`
    }

    if (initDate && finalDate) {
        defaultUrl += `initDate=${initDate}&finalDate=${finalDate}`
    }

    return defaultUrl;
}

export default {
    buscaAvancada: (
        partnerName, 
        paymentStatus, 
        initDate, 
        finalDate) => {
        return http.get(montarUrlComFiltros(partnerName, paymentStatus, initDate, finalDate))
    },

    thisweekpayments: () => {
        return http.get(`parcelas/thisweekpayments`);
    }
}
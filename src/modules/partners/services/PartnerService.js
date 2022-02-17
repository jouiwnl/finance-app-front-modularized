import { http } from '../../../config'

export default {
    findAll: () => {
        return http.get(`agencias`)
    },
    findById: (agenciaId) => {
        return http.get(`agencias/${agenciaId}`)
    },
    create: (agencia) => {
        return http.post('agencias', agencia);
    },
    inactive: (agenciaId) => {
        return http.patch(`agencias/${agenciaId}/inativar`)
    },
    update: (agencia, agenciaId) => {
        return http.put(`agencias/${agenciaId}`, agencia)
    }
}
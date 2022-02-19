import { http } from '../../../config'

export default {
    findAll: () => {
        return http.get(`email`)
    },
    findById: (emailId) => {
        return http.get(`email/${emailId}`)
    },
    create: (email) => {
        return http.post('email', email);
    },
    update: (email, emailId) => {
        return http.put(`email/${emailId}`, email)
    },
    delete: (emailId) => {
        return http.delete(`email/${emailId}`)
    }
}
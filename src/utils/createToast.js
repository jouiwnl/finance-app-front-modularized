export default class CreateToast {
    static createToastSuccess(message) {
        tata.success('Success!', message, {
            position: 'br',
            duration: 3000,
        })
    }

    static createToastFailed(message) {
        tata.error('Error!', message, {
            position: 'br',
            duration: 3000,
        })
    }

    static createToastInfo(title, message) {
        tata.info(title, message, {
            position: 'br',
            duration: 3000,
        })
    }

    static createToastWarning(message) {
        tata.warn('Warning!', message, {
            position: 'br',
            duration: 3000,
        })
    }
}
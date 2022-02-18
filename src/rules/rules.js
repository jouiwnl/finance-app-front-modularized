 const rules =  {
    text: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
      value => /[A-Za-z]/.test(value) || 'Only letters are permitted here.'
    ],
    email: [
      value => !!value || 'Required',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
    ],
    number: [
      value => !!value || 'Required',
      value => /^[0-9]/.test(value) || 'Only numbers are permitted here.',
    ]
  }

  export default rules;
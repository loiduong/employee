const validate = values => {
    const errors = {};
    let phoneNumber = values?.phone?.replace(/\s/g, '');

    if (!values.firstName) {
        errors.firstName = 'Required'
    } else if (values.firstName.length < 6) {
        errors.firstName = 'Must be 6 characters or more'
    } else if (values.firstName.length > 10) {
        errors.firstName = 'Must be 10 characters or less'
    }

    if (!values.lastName) {
        errors.lastName = 'Required'
    } else if (values.lastName.length < 6) {
        errors.lastName = 'Must be 6 characters or more'
    } else if (values.lastName.length > 10) {
        errors.lastName = 'Must be 10 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    if (!phoneNumber) {
        errors.phone = 'Required'
    } else if (
        phoneNumber &&
        !/\+65(6|8|9)\d{7}/g.test(phoneNumber)
    ) {
        errors.phone = 'Invalid phone number (Phone Singapore (+65))'
    }

    if (!values.gender) {
        errors.gender = 'Required'
    } 
    return errors
}

export default validate
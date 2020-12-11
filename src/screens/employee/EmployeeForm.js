import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Prompt } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import validate from './validations';
import InputCpn from '../../components/InputCnp';

const useStyles = makeStyles({
    input: {
        minWidth: 500,
        marginBottom: 10
    },
    wrapBtn: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});


const radioButton = ({ input, ...rest }) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
    </FormControl>
)


let EmployeeForm = props => {
    const classes = useStyles();
    const { handleSubmit, dirty, reset, isReset } = props;

    useEffect(() => {
        if (isReset) {
            reset()
        }
    }, [isReset])
    return (
        <form onSubmit={handleSubmit}>
            <InputCpn type="text" name="firstName" label="First Name" />
            <InputCpn type="text" name="lastName" label="Last Name" />
            <InputCpn type="text" name="email" label="Email" />
            <InputCpn type="text" name="phone" label="Phone" />
            <div>
                <Field name="gender" component={radioButton} />
            </div>
            <div />
            <Prompt when={dirty} message="Form has been modified. You will loose your unsaved changes. Are you sure you want to close this form?" />
            <div className={classes.wrapBtn}>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </form>

    )
}


EmployeeForm = reduxForm({
    form: 'EmployeeForm', // a unique identifier for this form
    validate,
    enableReinitialize: true
})(EmployeeForm)

EmployeeForm = connect(
    state => ({
        initialValues: state.employeesReducers.employee
    }),
)(EmployeeForm)

export default EmployeeForm

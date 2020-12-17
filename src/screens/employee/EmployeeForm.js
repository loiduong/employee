import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Prompt, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import validate from './validations';
import InputCpn from '../../components/InputCnp';
import { Routes } from '../../routers';
import ButtonCpn from '../../components/ButtonCpn';

const useStyles = makeStyles({
    input: {
        minWidth: 500,
        marginBottom: 10
    },
    wrapBtn: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    btnBack: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    txtBtn: {
        textDecoration: 'none',
        color: 'white'
    },
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


let EmployeeForm = memo(props => {
    const classes = useStyles();
    const { handleSubmit, dirty, reset, isReset, isLoading } = props;

    useEffect(() => {
        if (isReset) {
            reset()
        }
    }, [isReset])
    return (
        <div>
            <div className={classes.btnBack}>
                <ButtonCpn variant="contained" color="primary" hasLink={<Link className={classes.txtBtn} to={Routes.employees.path}>Back</Link>} />
            </div>
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
                <ButtonCpn type="submit" variant="contained" color="primary" title="Submit" isLoading={isLoading} />
                </div>
            </form>
        </div>


    )
})


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

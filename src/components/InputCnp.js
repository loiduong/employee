import React from 'react';
import { Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


const renderTextField = ({
    label,
    input,
    type,
    meta: { touched, invalid, error },
    ...custom
}) => (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            type={type}
            {...input}
            {...custom}
        />
    )

const InputCpn = (props) => {
    const { name, label, type } = props;
    const classes = useStyles();
    return (
        <div>
            <Field classes={{ root: classes.input }} name={name} component={renderTextField} label={label} type={type} />
        </div>
    )
}

export default InputCpn
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import EmployeeForm from './EmployeeForm';
import { EmployeeService } from './services';

const useStyles = makeStyles({
    wrapForm: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'column'
    },
    txtTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15
    }
});

const EmployeeCreate = () => {
    const classes = useStyles();
    const [isReset, setIsReset] = useState(false);
    const _onSubmit = async (values) => {
        EmployeeService.createEmployee(values)
            .then(res => {
                setIsReset(true)
                alert("Created successfully!!!");
            })
            .catch(err => {
                alert(err)
            })
    }
    return (
        <div className={classes.wrapForm}>
            <div className={classes.txtTitle}>Create new employee</div>
            <EmployeeForm isReset={isReset} onSubmit={(values) => _onSubmit(values) }/>
        </div>
    )
}

export default EmployeeCreate
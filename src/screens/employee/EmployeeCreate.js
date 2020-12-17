import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EmployeeForm from './EmployeeForm';
import { EmployeeService } from './services';
import { toast } from 'react-toastify';

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
    },
});

const EmployeeCreate = () => {
    const classes = useStyles();
    const [isReset, setIsReset] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const _onSubmit = async (values) => {
        setLoading(true);
        setIsReset(false);
        EmployeeService.createEmployee(values)
            .then(res => {
                setIsReset(true);
                setLoading(false);
                toast.success("Created successfully!!!");
            })
            .catch(err => {
                setLoading(false);
                toast.error("Create failed!!!")
            })
    }
    return (
        <div className={classes.wrapForm}>
            <div className={classes.txtTitle}>Create new employee</div>
            <EmployeeForm isReset={isReset} onSubmit={(values) => _onSubmit(values)} isLoading={isLoading}/>
        </div>
    )
}

export default EmployeeCreate
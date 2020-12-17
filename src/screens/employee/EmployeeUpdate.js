import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

import { EmployeeService } from './services';
import EmployeeForm from './EmployeeForm';
import { store } from '../..';
import { EMPLOYEE_DETAIL } from './reducers';

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

const EmployeeUpdate = (props) => {
    const classes = useStyles();
    const { id } = props.match.params;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        _fetchData();
    }, [])

    useEffect(() => {
        return () => {
            store.dispatch({
                type: EMPLOYEE_DETAIL,
                data: null
            })
        };
    }, [])

    const _fetchData = () => {
        EmployeeService.getEmployee(id)
            .then(res => {
                store.dispatch({
                    type: EMPLOYEE_DETAIL,
                    data: res
                })
            })
            .catch(err => {
                toast.error(err);
            })
    }
    const _onSubmit = (values) => {
        setIsLoading(true);
        EmployeeService.updateEmployee(id, values)
            .then(res => {
                _fetchData();
                setIsLoading(false);
                toast.success("Updated successfully!!!");
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Update failed!!!");
            })
    }

    return (
        <div className={classes.wrapForm}>
            <div className={classes.txtTitle}>Update employee</div>
            <EmployeeForm onSubmit={(values) => _onSubmit(values)} isLoading={isLoading} />
        </div>
    )
}

export default EmployeeUpdate
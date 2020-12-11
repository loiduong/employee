import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Backdrop } from "@material-ui/core";

import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import { EmployeeService } from './services';
import { store } from '../..';
import { EMPLOYEE_LIST } from './reducers';
import { Routes } from '../../routers'



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    btnAdd: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '20px 90px'
    },
    btnActionWrap: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    txtBtn: {
        textDecoration: 'none',
        color: 'white'
    },
    txtTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        margin: 20
    },
    customBackdrop: {
        zIndex: 1
    },
});




function Employees() {
    const { employees } = useSelector(state => state.employeesReducers);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        _fetchData();
    }, [])
    const classes = useStyles();

    const _fetchData = () => {
        setIsloading(true);
        EmployeeService.getEmployees()
            .then(res => {
                setIsloading(false);
                store.dispatch({
                    type: EMPLOYEE_LIST,
                    data: res
                });
            })
            .catch(err => {
                setIsloading(false);
                alert(err)
            })
    }

    const popupConfirmDelete = (id) => {
        if (window.confirm("Delete the item?")) {
            _removeEmployee(id)
        }

    }

    const _removeEmployee = (id) => {
        EmployeeService.removeEmployee(id)
            .then(res => {
                alert('Deleted successfully!!!')
                _fetchData();
            })
            .catch(err => {
                alert("Delete failed!!!")
            })
    }

    const convertGender = value => {
        let gender = null;
        switch (value) {
            case 'male':
                gender = "Male"
                break;
            case 'female':
                gender = "Female"
                break;
            case 'other':
                gender = "Other"
                break;
            default:
                break;
        }
        return gender
    }

    if (!employees) return null;
    return (
        <div className={classes.employeesWrap}>
            <div className={classes.txtTitle}>Employee list</div>
            <div className={classes.btnAdd} >
                <Button variant="contained" color="primary">
                    <Link className={classes.txtBtn} to={Routes.employeeCreate.path}>Add</Link>
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">First name</TableCell>
                            <TableCell align="center">Last name</TableCell>
                            <TableCell align="center">Email address</TableCell>
                            <TableCell align="center">Phone number</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{convertGender(row.gender)}</TableCell>
                                <TableCell align="center">
                                    <div className={classes.btnActionWrap}>
                                        <Button variant="contained" color="primary">
                                            <Link className={classes.txtBtn} to={Routes.employeeUpdate.renderPath(row.id)}>Edit</Link>
                                        </Button>
                                        <Button onClick={() => popupConfirmDelete(row.id)} variant="contained" color="secondary">Delete</Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop classes={{ root: classes.customBackdrop }} open={isLoading}>
                <CircularProgress />
            </Backdrop>
        </div>
    )
}

export default Employees
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

import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";

import { Confirm } from 'react-st-modal';

import { EmployeeService } from './services';
import { store } from '../..';
import { EMPLOYEE_LIST } from './reducers';
import { Routes } from '../../routers'
import ButtonCpn from '../../components/ButtonCpn';


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
    const [isDeleting, setIsDeleting] = useState(false);
    const [idSelected, setIdSelected] = useState(null);

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
                toast.error(err)
            })
    }


    const popupConfirmDelete = async (id) => {
        const result = await Confirm('Are you sure delete?',
            'Delete');
        if (result) {
            _removeEmployee(id)
        } else {
            // Сonfirmation not confirmed
        }

    }

    const _removeEmployee = (id) => {
        setIsDeleting(true);
        setIdSelected(id);
        EmployeeService.removeEmployee(id)
            .then(res => {
                toast.success("Deleted successfully!!!");
                _fetchData();
                setIsDeleting(false);
            })
            .catch(err => {
                setIsDeleting(false);
                toast.error("Delete failed!!!")
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
                <ButtonCpn variant="contained" color="primary" hasLink={<Link className={classes.txtBtn} to={Routes.employeeCreate.path}>Add</Link>} />
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
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
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{convertGender(row.gender)}</TableCell>
                                <TableCell align="center">
                                    <div className={classes.btnActionWrap}>
                                        <ButtonCpn variant="contained" color="primary" hasLink={<Link className={classes.txtBtn} to={Routes.employeeUpdate.renderPath(row.id)}>Edit</Link>} />
                                        <ButtonCpn onClick={() => popupConfirmDelete(row.id)} variant="contained" color="secondary" title="Delete" isLoading={isDeleting && (idSelected === row.id)} />
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
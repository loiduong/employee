import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Employees from './screens/employee/Employees';
import EmployeeCreate from './screens/employee/EmployeeCreate';
import EmployeeUpdate from './screens/employee/EmployeeUpdate';

export const Routes = {
    employees: {
        title: 'Employee List',
        path: '/employee/list',
        component: Employees,
    },
    employeeCreate: {
        title: 'Employee Create',
        path: '/employee/add',
        component: EmployeeCreate,
    },
    employeeUpdate: {
        title: 'Employee Update',
        path: '/employee/:id',
        renderPath: (id) => `/employee/${id}`,
        component: EmployeeUpdate,
    },
}

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                {Object.values(Routes).map((item, key) => {
                    return <Route
                        key={key}
                        exact
                        path={item.path}
                        component={(props) => {
                            return (
                                <Fragment>
                                    <item.component {...props} />
                                </Fragment>
                            )
                        }}
                    />
                })}
                <Route exact path="/">
                    <Redirect to="/employee/list" />
                </Route>
            </Switch>
        </Router>
    )
}
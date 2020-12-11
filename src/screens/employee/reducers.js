export const EMPLOYEE_LIST = "EMPLOYEE_LIST";
export const EMPLOYEE_DETAIL = "EMPLOYEE_DETAIL";

const initialState = [{
    employees: null,
    employee: null
}];

export default function employeesReducers(state = initialState, action) {
    switch (action.type) {
        case EMPLOYEE_LIST:
            return { ...state, employees: action.data };
        case EMPLOYEE_DETAIL:
            return { ...state, employee: action.data };
        default:
            return state;
    }
}
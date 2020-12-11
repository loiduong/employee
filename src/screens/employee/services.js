import RequestService from '../../services/request/requestService';

export class EmployeeService {
    static async getEmployees(){
        return RequestService.get('/employees')
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }

    static async getEmployee(id){
        return RequestService.get(`/employees/${id}`)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }

    static async createEmployee(payload){
        return RequestService.post('/employees', payload)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }

    static async updateEmployee(id, payload){
        return RequestService.put(`/employees/${id}`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }


    static async removeEmployee(id){
        return RequestService.delete(`/employees/${id}`)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }
}
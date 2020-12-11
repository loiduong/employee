import Axios from 'axios';
import { ObjectUtils } from '../../utils/object';

const URL_SERVER_API = 'https://5a4dd10af82a03001203ee3a.mockapi.io/api';

//TODO Handle errors
export class ServerError extends Error {
    status;
    message;
    errors;
    error;

    constructor(error) {
        super(error);
        this.message = 'Lỗi không xác định từ hệ thống.'
        this.errors = error.response.data.errors;
        this.status = 3001;
        if (error.message === "Network Error") this.message = 'Không kết nối được hệ thống, bạn vui lòng kiểm tra lại đường truyền.';
        this.error = {
            message: this.message,
            errors: this.errors,
            status: this.status
        }
    }
}





export class RequestService {
    static getURL(subURL) { return `${URL_SERVER_API}${subURL}` }

    static getConfigs(params) {
        let headers = {
        };
        return {
            headers: ObjectUtils.cleanObj(headers),
            params: Object.assign(ObjectUtils.cleanObj(params), {}),
            timeout: 20000
        }
    }

    static async get(subURL, params) {
        return Axios.get(this.getURL(subURL), this.getConfigs(params))
            .then(res => res.data)
            .catch(err => {
                throw new ServerError(err)
            });
    }

    static async post(subURL, payload) {
        return Axios.post(this.getURL(subURL), payload, this.getConfigs())
            .then(res => res.data)
            .catch(err => {
                throw new ServerError(err)
            });
    }

    static async put(subURL, payload) {
        return Axios.put(this.getURL(subURL), payload, this.getConfigs())
            .then(res => res.data)
            .catch(err => {
                throw new ServerError(err)
            });
    }

    static async delete(subURL) {
        return Axios.delete(this.getURL(subURL), this.getConfigs())
            .then(res => res.data)
            .catch(err => {
                throw new ServerError(err)
            });
    }
}

export default RequestService
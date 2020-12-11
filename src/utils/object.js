export class ObjectUtils {
    

    static cleanObj(obj) {
        obj = obj || {};
        return Object.keys(obj).reduce((acc, key) => (
            obj[key] === undefined
                || obj[key] === null
                || obj[key] === ''
                ? acc
                : { ...acc, [key]: obj[key] }
        ), {})
    }
}
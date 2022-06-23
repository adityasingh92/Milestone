function isEmptyObject(obj: Object){
    if(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype){
        return true;
    }

    return false;
}

export default isEmptyObject;
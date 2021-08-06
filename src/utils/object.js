export const compareObjects = (obj1, obj2) =>{
    for(const prop in obj1){
        if(obj1[prop] !== obj2[prop]){
            return false;
        }
    }
    if(Object.keys(obj1).length !== Object.keys(obj2).length){
        return false;
    }
    return true;
}
import {
    inValidObjectText,
    acceptedObjectText
} from '../../Locale/atoms/objects';
import isEmptyObject from "./isEmptyObject";
/**
 * Checks if provided object has all desired properties
 */
function isValidObject(object: Object, propertyArray: string[]){

    if(isEmptyObject(object)){
        return {
            status: false,
            message: inValidObjectText
        };
    }

    
    for(const property of propertyArray){
        if(!object.hasOwnProperty(property)){
            return {
                status: false,
                message: inValidObjectText
            };
        }
    }

    return {
        status: true,
        message: acceptedObjectText
    }
}

export default isValidObject;
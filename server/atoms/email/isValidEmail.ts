import {
    inValidEmailText,
    emailLengthErrorText,
    validEmailText
} from '../../Locale/atoms/email/index';
/**
 * Checks if email is valid or not. Should be between 7 to 255 characters long
 */
function isValidEmail(email:string){
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!EMAIL_REGEX.test(email)){
        return {
            status: false,
            message: inValidEmailText
        };
    }

    if(email.length < 7 || email.length > 255){
        return {
            status: false,
            message: emailLengthErrorText
        };
    }

    return {
        status: true,
        message: validEmailText
    }
};

export default isValidEmail;
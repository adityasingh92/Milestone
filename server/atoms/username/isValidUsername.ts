import {
    invalidUsernameErrorText,
    usernameLengthErrorText,
    usernameSpecialCharacterErrorText,
    validUsernameText
} from '../../Locale/atoms/username';

/**
 * Validating Username.
 * 1. Should be between 4 and 255 characters long
 * 2. Should not have specials characters inside it
 */
function isValidUsername(username:string){
    if(!username){
        return {
            status: false,
            message: invalidUsernameErrorText
        };
    }

    if(username.length < 5 || username.length > 255){
        return {
            status: false,
            message: usernameLengthErrorText
        };
    }

    if(!/^[a-zA-Z0-9]+$/.test(username)){
        return {
            status: false,
            message: usernameSpecialCharacterErrorText
        };
    }

    return {
        status: true,
        message: validUsernameText
    }
}

export default isValidUsername;
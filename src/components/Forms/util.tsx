import { CustomError, QueryResponseErrorData } from '@/queries/base';

const firebaseCodesToFieldErrors : { [key: string]: string } = {
    'auth/wrong-password':  'WRONG_PASSWORD',
    'auth/user-not-found':  'USER_NOT_FOUND',
    'auth/invalid-email':   'INVALID_EMAIL',
    'auth/email-already-in-use': 'EMAIL_ALREADY_IN_USE',
    'auth/weak-password': 'WEAK_PASSWORD',
    'auth/invalid-credential': 'INVALID_CREDENTIAL',
    'auth/invalid-verification-code': 'INVALID_VERIFICATION_CODE',
    'auth/invalid-verification-id': 'INVALID_VERIFICATION_ID',
};

const mapFirebaseError = (error: CustomError) : string | null => {
    if (!error.code || !error.message) {
        return null;
    }

    // get from firebaseCodesToFieldErrors
    if (firebaseCodesToFieldErrors[error.code]) {
        return firebaseCodesToFieldErrors[error.code];
    }

    return null;
};

const mapError = (error: CustomError) : string | null => {
    if (!error.code || !error.message) {
        return null;
    }

    if (error.code === 'required') {
        return 'This field is required';
    }
    else if (error.code === 'password_too_short') {
        return error.message;
    }
    else if (error.code === 'password_too_common') {
        return error.message;
    }
    else if (error.code === 'invalid') {
        return error.message;
    }
    else if (error.code === 'max_length') {
        return error.message;
    }
    else if (error.code === 'already_exists') {
        return error.message;
    }
    else if (error.code === 'blank') {
        return error.message;
    }

    return null;
};

export const firebaseFieldErrorConvert = (code: string, field: string) => {
    return {
        form: {
            field_errors: {
                [field]: [
                    {
                        message: firebaseCodesToFieldErrors[code],
                        code: firebaseCodesToFieldErrors[code],
                    }
                ]
            }
        }
    };
};

export const getFormFieldErrors
    = (error: QueryResponseErrorData | undefined | null, fieldName: string): string[] => {
        if (!error) {
            return [];
        }

        const formErrors = error.form;

        if (!formErrors) {
            return [];
        }
        const fieldErrors = formErrors.field_errors;

        if (!fieldErrors) {
            return [];
        }

        const fieldErrorsArr = fieldErrors[fieldName];

        if (!fieldErrorsArr) {
            return [];
        }

        console.log('FIELD ERRORS', fieldErrorsArr);

        const serverFieldArr = fieldErrorsArr.map(mapError)
            .filter<string>((x): x is string => x !== null);

        const firebaseFieldArr = fieldErrorsArr.map(mapFirebaseError)
            .filter<string>((x): x is string => x !== null);

        console.log('AserverFieldArr', serverFieldArr);
        console.log('AfirebaseFieldArr', firebaseFieldArr);

        return serverFieldArr.concat(firebaseFieldArr);
    };

export const getNonFieldErrors = (error: QueryResponseErrorData | undefined | null) => {

    if (!error) {
        return [];
    }

    const formErrors = error.form;

    if (!formErrors) {
        return [];
    }

    const serverNonFieldArr = (formErrors.non_field_errors || []).map(mapError)
        .filter<string>((x): x is string => x !== null);

    const firebaseNonFieldArr = (formErrors.non_field_errors || []).map(mapFirebaseError)
        .filter<string>((x): x is string => x !== null);

    console.log('serverNonFieldArr', serverNonFieldArr);
    console.log('firebaseNonFieldArr', firebaseNonFieldArr);
    console.log('result', serverNonFieldArr.concat(firebaseNonFieldArr));

    const result =  serverNonFieldArr.concat(firebaseNonFieldArr);

    return result;
};
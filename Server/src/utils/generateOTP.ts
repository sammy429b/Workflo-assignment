import * as otpGenerator from 'otp-generator';

interface Options {
    digits?: boolean;
    lowerCaseAlphabets?: boolean;
    upperCaseAlphabets?: boolean;
    specialChars?: boolean;
}

const generateOTP = (length: number=6, options?: Options) => {
    const defaultOptions: Options = {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    };

    return otpGenerator.generate(length, options || defaultOptions);
};

export default generateOTP;



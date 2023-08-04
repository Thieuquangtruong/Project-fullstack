import joi from 'joi'

const registerValidation = joi.object ({
    firstName: joi.string().required().messages({
        "string.empty": "Firstname cannot empty",
        "any.require": "Firstname is required",
        "string.min": "Firstname at least 2 characters",
        "string.max": "Firstname at most 50 characters"
    }),
    lastName: joi.string().required().messages({
        "string.empty": "Lastname cannot empty",
        "any.require": "Lastname is required",
        "string.min": "Lastname at least 2 characters",
        "string.max": "Lastname at most 50 characters"
    }),
    email: joi.string().required().messages({
        "string.empty": "Email cannot empty",
        "any.require": "Email is required",
        "string.email": "This email is a invalid email address string",
        "string.max": "Email at most 50 characters"
    }),
    password: joi.string().required().messages({
        "string.empty": "Firstname cannot empty",
        "any.require": "Firstname is required",
        "string.min": "Firstname at least 2 characters",
        "string.max": "Firstname at most 50 characters"
    }),
    picture: joi.string().required().messages({
        
    }),
    friend: joi.array().required().messages({

    }),
    location: joi.number().required().messages({

    }),
    occupation: joi.number().required().messages({

    }),
    viewedProfile: joi.number().required().messages({

    }),
    impressions: joi.number().required().messages({
        
    }),
});

module.exports = {
    registerValidation,
}
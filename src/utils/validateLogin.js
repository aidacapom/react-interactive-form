export default function validateLogin(values) {
    let errors = {}

    if(!values.id) {
        errors.id = "Please enter your id."
    }

    if(!values.password.length) {
        errors.password = "Please enter your password."
    }

    return errors
}
const handleErrorMessage = (error) => {
    if (error.code === "ERR_NETWORK") {
        return error.message
    }
    if (error.code === "ERR_BAD_REQUEST") {
        return 'Incorrect login or password'
    }
    
}

export default handleErrorMessage
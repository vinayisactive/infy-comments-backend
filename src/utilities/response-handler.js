const successResponse = (res, message, data, status = 200) => {
    return res.status(status).json({success: true, message, data }); 
}

const errorResponse = (res, message, status = 500) => {
    console.log(message)
    return res.status(status).json({success: false, message: message || "Internal Server Error."}); 
}

const earlyReturnResponse = (res, message, status) => {
    return res.status(status).json({success: false, message : message || "Internal Server Error."}); 
}


export {
    successResponse, 
    errorResponse, 
    earlyReturnResponse
}; 
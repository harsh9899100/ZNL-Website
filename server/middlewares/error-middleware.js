const errorMiddleware = (err, req, res ,next) => { 
    const status = err.status || 500; // by default status
    const message = err.message || "Backent Error";
    const extraDetails = err.extraDetails || "Error from Backend";

    return res.status(status).json({message, extraDetails});

}


module.exports = errorMiddleware; 
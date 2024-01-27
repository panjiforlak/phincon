const logRequest = (req,res,next)=>{
    console.log('request to : ',req.path);
    
    next();
}

module.exports = logRequest
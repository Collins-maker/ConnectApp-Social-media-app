const authorize = (req, res, next)=>{
    if(req.session.user && req.session.authorized){
        next();
    }else{
        res.send("log in to proceed!")
    }
};

module.exports =authorize;
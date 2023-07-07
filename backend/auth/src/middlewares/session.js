const authorize = (req, res, next)=>{
    if(req.session.user){
        next();
    }else{
        res.send("log in to proced!")
    }
};

module.exports =authorize;
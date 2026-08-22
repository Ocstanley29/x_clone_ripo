import aj from "../config/arcjet.js"
//arcjet middleware for ratelimiting

export const arcjetMiddleware = async(req, res, next)=>{
    try {
        const decission = await aj.protect(req, {
            requested: 1 //each request comes one token
        });

        if (decission.isDenied()){
            if(decission.reasin.isRateLimit()){
                return res.status(429).json({ 
                    error: "too many request!",
                    message: "rate limit exceeded, try again later"
                });

            }else if(decission.reason.isBot){
                return res.status(403).json({
                    error:"bot detected",
                    message : "access denied"
                })

            }else{
                return res.status(403).json({
                    error:"forbidden",
                    message:"access denied by security policy"
                })
            }
        }
        if (decission.results.some((result)=>result.reason.isBot()&&result.reason.isSpoofed())){
            return res.status(403).json({
                error:"spoofed Bot detected",
                message:"malicious bot activity detected"
            })
        }
        next()
    } catch (error) {
        console.error("arcjet midleware error");
        next()
        
    }

}
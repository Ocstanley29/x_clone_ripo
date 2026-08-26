import arcjet, {tokenBucket,shield, detectBot} from "@arcjet/node"
import {ENV} from "./env.js";

export const aj= arcjet({
    key:ENV.ARCJET_KEY,
    characteristics:["ip.src",],
    rules: [
        shield({node:LIVE}),
        detectBot({
            node:"LIVE",
            allow:[
                "CATEGORY:SEARCH ENGINE",
            ],
        }),

        //rate limiting
        tokenBucket({
            node:"LVE",
            refillRate:10,//token added per interval
            interval:10,//interval in sec(10)
            capacity:15 //max token in bucket
        }),
    ],
})
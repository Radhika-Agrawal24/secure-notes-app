const Redis=require('ioredis')
const cacheInstance=new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
})
cacheInstance.on("connect",()=>{
    console.log("Connected to Redis");
})
cacheInstance.on("error",(error)=>{
    console.error("Redis connection error:",error);
})
module.exports=cacheInstance;
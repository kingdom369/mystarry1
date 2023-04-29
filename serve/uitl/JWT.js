
const jsonwebtoken = require("jsonwebtoken")
const secret = "starry"
const JWT = {
    generate(value,exprires){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
       try{
        return jsonwebtoken.verify(token,secret)
       }catch(e){
        return false
       }
    }
}
module.exports = JWT

// const token =  JWT.generate({name:"starry"},"10s")
// console.log(JWT.verify(token))

// setTimeout(()=>{
//     console.log(JWT.verify(token))
// },11000)


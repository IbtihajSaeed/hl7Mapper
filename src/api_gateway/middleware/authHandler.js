// import jwt from "jsonwebtoken";
// import redisClient from "../../config/db.config.js";
// export const checkAuth =async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       console.log("no access");  
//       throw new Error("Token Not Found");
//     }
//     const token = req.headers.authorization.split(' ')[1];
    

//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await redisClient.hgetall(`users:${payload.email}`);
//     req.user = payload;
//     if (!user) {
//       throw new Error("Invalid Access!");
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };


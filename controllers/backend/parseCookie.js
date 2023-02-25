import jwt from "jsonwebtoken";
let JWT_SECRET = process.env.JWT_SECRET;

function parseCookie(value) {
  return new Promise((resolve, reject) => {
    let payload;
    try {
      payload = jwt.verify(value, JWT_SECRET);
    } catch (e) {
      console.log(e);
      return reject(new Error("Invalid user"));
    }

    return resolve(payload);
  });
}

export default parseCookie;

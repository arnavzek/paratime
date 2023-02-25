const crypto = require("crypto");

function generateRandomName() {
  return new Promise((resolve) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }

      const name = buf.toString("hex");
      resolve(name);
    });
  });
}

//how to replace file

export default generateRandomName;

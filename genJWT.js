import crypto from "crypto";

function generateJwtSecret() {
  const secretBytes = crypto.randomBytes(32); // 32 bytes for a 256-bit secret
  const secretString = secretBytes.toString("hex");
  return secretString;
}

const jwtSecret = generateJwtSecret();
console.log("Generated JWT Secret:", jwtSecret);

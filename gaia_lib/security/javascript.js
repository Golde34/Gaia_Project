const crypto = require('crypto');

// Your base64 encoded public key
const PUBLIC_KEY_STRING = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkFDBJGOSJg38OxsEbEV81DfQ5eySDQiggsMzIkKL7rxLJtvkSovJkJGaFPlqSU5s71r1+PoOY6KmwikCrnrB0LbdaDCtYwNuOp+AU/NfdUzpmfd9Iy3JC5KDJ8q/adlChM0tFwamepNzjrHb2oRnqRKABgSWDFKSl93bCCq0pPQIDAQAB"
const PRIVATE_KEY_STRING = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKQUMEkY5ImDfw7GwRsRXzUN9Dl7JINCKCCwzMiQovuvEsm2+RKi8mQkZoU+WpJTmzvWvX4+g5joqbCKQKuesHQtt1oMK1jA246n4BT8191TOmZ930jLckLkoMnyr9p2UKEzS0XBqZ6k3OOsdvahGepEoAGBJYMUpKX3dsIKrSk9AgMBAAECgYAHiOeFCGScCSm11LecCCzoqmDzeRbsTU/f3QMxTq1YzcT0Y9w8j0kQ3sp8vV8Dr8rqcUWlAckPSmo2MaVooL/x4JL3nA0I/DlbXlzscfoWzGMI6c1Bcb2mZngYXVqMmhxNdcreV+Y94LpFqXdH+H3vck8z+q3tNvgiLGNHsHl+zQJBALJGTZJC99gZosi6MVYqWiiA6lD6J7/Yvy2sJNilLeuozoLI7bgdx9d0rkWIFv9zcGuWvI6PgvFVxD+yTcd6HE8CQQDrnXWyP7vtgQeKZsV5hnOb0pCg4X/EpmU9fl/V1E+fReFcVKRVUrh/pc8VK0qJg0o0VmVdv2kQimN9fFbgUUKzAkBBrUTGrYVBR7CA4pdqdw/f/B5W1tHuC5vi55hrd+8C8p2h8QQi4FXPOl05oHlYgt7XxCCTJKvI3R//l2CwLHxhAkEAqerZeV4LSmH2LTKmkViMQUDeepeFTC1v76QWux+s+EEuICcOiFXqpmvOZwbcb0VWm13/JlenDn2u+E1WXdlcjwJAE0/Bf+5VOcJXYlyJg0SUt5qemArQjynOXQjMdrbO54avw+7792YGW0JG6plVfiZ2J3lQrDPsnAzpCrmLOKbHJA=="


function encrypt(plainText) {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY_STRING}\n-----END PUBLIC KEY-----`;
  const buffer = Buffer.from(plainText, 'utf8');
  
  const encrypted = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
  }, buffer);

  return encrypted.toString('base64');
}

const plainText = "auth_service::Golde34::1";
const encryptedText = encrypt(plainText);
console.log("Encrypted Text:", encryptedText);


function decrypt(encryptedText) {
  const privateKey = `-----BEGIN PRIVATE KEY-----\n${PRIVATE_KEY_STRING}\n-----END PRIVATE KEY-----`;
  const buffer = Buffer.from(encryptedText, 'base64');
  
  const decrypted = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
  }, buffer);

  return decrypted.toString('utf8');
}

const decryptedText = decrypt(encryptedText);
console.log("Decrypted Text:", decryptedText);
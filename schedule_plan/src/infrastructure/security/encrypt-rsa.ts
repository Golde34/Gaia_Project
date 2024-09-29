import crypto from 'crypto';
import { config } from '../../kernel/config/security.configuration';

const PUBLIC_KEY = config.publicKey;

export function encrypt(plainText: string) {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  const buffer = Buffer.from(plainText, 'utf8');
  
  const encrypted = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
  }, buffer);

  return encrypted.toString('base64');
}


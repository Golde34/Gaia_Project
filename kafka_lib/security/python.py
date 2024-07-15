from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
import base64

# Your base64 encoded public key
PUBLIC_KEY_STRING = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkFDBJGOSJg38OxsEbEV81DfQ5eySDQiggsMzIkKL7rxLJtvkSovJkJGaFPlqSU5s71r1+PoOY6KmwikCrnrB0LbdaDCtYwNuOp+AU/NfdUzpmfd9Iy3JC5KDJ8q/adlChM0tFwamepNzjrHb2oRnqRKABgSWDFKSl93bCCq0pPQIDAQAB'

def encrypt(plain_text):
    public_key = serialization.load_pem_public_key(
        base64.b64decode(PUBLIC_KEY_STRING),
    )
    encrypted = public_key.encrypt(
        plain_text.encode('utf-8'),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(encrypted).decode('utf-8')

plain_text = "This is a sample token"
encrypted_text = encrypt(plain_text)
print("Encrypted Text:", encrypted_text)
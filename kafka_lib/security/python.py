from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
import base64


# Your base64 encoded public key
PUBLIC_KEY_STRING = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkFDBJGOSJg38OxsEbEV81DfQ5eySDQiggsMzIkKL7rxLJtvkSovJkJGaFPlqSU5s71r1+PoOY6KmwikCrnrB0LbdaDCtYwNuOp+AU/NfdUzpmfd9Iy3JC5KDJ8q/adlChM0tFwamepNzjrHb2oRnqRKABgSWDFKSl93bCCq0pPQIDAQAB'
PRIVATE_KEY_STRING = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKQUMEkY5ImDfw7GwRsRXzUN9Dl7JINCKCCwzMiQovuvEsm2+RKi8mQkZoU+WpJTmzvWvX4+g5joqbCKQKuesHQtt1oMK1jA246n4BT8191TOmZ930jLckLkoMnyr9p2UKEzS0XBqZ6k3OOsdvahGepEoAGBJYMUpKX3dsIKrSk9AgMBAAECgYAHiOeFCGScCSm11LecCCzoqmDzeRbsTU/f3QMxTq1YzcT0Y9w8j0kQ3sp8vV8Dr8rqcUWlAckPSmo2MaVooL/x4JL3nA0I/DlbXlzscfoWzGMI6c1Bcb2mZngYXVqMmhxNdcreV+Y94LpFqXdH+H3vck8z+q3tNvgiLGNHsHl+zQJBALJGTZJC99gZosi6MVYqWiiA6lD6J7/Yvy2sJNilLeuozoLI7bgdx9d0rkWIFv9zcGuWvI6PgvFVxD+yTcd6HE8CQQDrnXWyP7vtgQeKZsV5hnOb0pCg4X/EpmU9fl/V1E+fReFcVKRVUrh/pc8VK0qJg0o0VmVdv2kQimN9fFbgUUKzAkBBrUTGrYVBR7CA4pdqdw/f/B5W1tHuC5vi55hrd+8C8p2h8QQi4FXPOl05oHlYgt7XxCCTJKvI3R//l2CwLHxhAkEAqerZeV4LSmH2LTKmkViMQUDeepeFTC1v76QWux+s+EEuICcOiFXqpmvOZwbcb0VWm13/JlenDn2u+E1WXdlcjwJAE0/Bf+5VOcJXYlyJg0SUt5qemArQjynOXQjMdrbO54avw+7792YGW0JG6plVfiZ2J3lQrDPsnAzpCrmLOKbHJA=='

def load_public_key_from_string(public_key_string):
    public_key_bytes = base64.b64decode(public_key_string)
    public_key = serialization.load_der_public_key(public_key_bytes, backend=default_backend())
    return public_key

def encrypt(plain_text, public_key):
    encrypted = public_key.encrypt(
        plain_text.encode('utf-8'),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(encrypted).decode('utf-8')

public_key = load_public_key_from_string(PUBLIC_KEY_STRING)
plain_text = "auth_service::Golde34::1"
encrypted_text = encrypt(plain_text, public_key)
print("Encrypted Text:", encrypted_text)

def load_private_key_from_string(private_key_string):
    private_key_bytes = base64.b64decode(private_key_string)
    private_key = serialization.load_der_private_key(private_key_bytes, password=None, backend=default_backend())
    return private_key

def decrypt(encrypted_text, private_key):
    encrypted_bytes = base64.b64decode(encrypted_text)
    decrypted = private_key.decrypt(
        encrypted_bytes,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted.decode('utf-8')

private_key = load_private_key_from_string(PRIVATE_KEY_STRING)
decrypted_text = decrypt(encrypted_text, private_key)
print("Decrypted Text:", decrypted_text)

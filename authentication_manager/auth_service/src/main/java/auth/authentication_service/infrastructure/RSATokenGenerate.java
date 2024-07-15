package auth.authentication_service.infrastructure;

import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class RSATokenGenerate {
    public static void main(String[] args) throws Exception {
        String PUBLIC_KEY_STRING = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkFDBJGOSJg38OxsEbEV81DfQ5eySDQiggsMzIkKL7rxLJtvkSovJkJGaFPlqSU5s71r1+PoOY6KmwikCrnrB0LbdaDCtYwNuOp+AU/NfdUzpmfd9Iy3JC5KDJ8q/adlChM0tFwamepNzjrHb2oRnqRKABgSWDFKSl93bCCq0pPQIDAQAB";
        String PRIVATE_KEY_STRING = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKQUMEkY5ImDfw7GwRsRXzUN9Dl7JINCKCCwzMiQovuvEsm2+RKi8mQkZoU+WpJTmzvWvX4+g5joqbCKQKuesHQtt1oMK1jA246n4BT8191TOmZ930jLckLkoMnyr9p2UKEzS0XBqZ6k3OOsdvahGepEoAGBJYMUpKX3dsIKrSk9AgMBAAECgYAHiOeFCGScCSm11LecCCzoqmDzeRbsTU/f3QMxTq1YzcT0Y9w8j0kQ3sp8vV8Dr8rqcUWlAckPSmo2MaVooL/x4JL3nA0I/DlbXlzscfoWzGMI6c1Bcb2mZngYXVqMmhxNdcreV+Y94LpFqXdH+H3vck8z+q3tNvgiLGNHsHl+zQJBALJGTZJC99gZosi6MVYqWiiA6lD6J7/Yvy2sJNilLeuozoLI7bgdx9d0rkWIFv9zcGuWvI6PgvFVxD+yTcd6HE8CQQDrnXWyP7vtgQeKZsV5hnOb0pCg4X/EpmU9fl/V1E+fReFcVKRVUrh/pc8VK0qJg0o0VmVdv2kQimN9fFbgUUKzAkBBrUTGrYVBR7CA4pdqdw/f/B5W1tHuC5vi55hrd+8C8p2h8QQi4FXPOl05oHlYgt7XxCCTJKvI3R//l2CwLHxhAkEAqerZeV4LSmH2LTKmkViMQUDeepeFTC1v76QWux+s+EEuICcOiFXqpmvOZwbcb0VWm13/JlenDn2u+E1WXdlcjwJAE0/Bf+5VOcJXYlyJg0SUt5qemArQjynOXQjMdrbO54avw+7792YGW0JG6plVfiZ2J3lQrDPsnAzpCrmLOKbHJA==";
        // Bước 1: Tạo cặp khóa RSA
        // Get public key from string value
        byte[] publicKeyBytes = Base64.getDecoder().decode(PUBLIC_KEY_STRING);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);

        // Dữ liệu để mã hóa
        String token = "auth_service::Golde34::1";

        Cipher encryptCipher = Cipher.getInstance("RSA");
        encryptCipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedBytes = encryptCipher.doFinal(token.getBytes("UTF-8"));
        String encryptedToken = Base64.getEncoder().encodeToString(encryptedBytes);

        System.out.println("Encrypted Token: " + encryptedToken);

        // Bước 3: Giải mã dữ liệu bằng private key
        byte[] privateKeyBytes = Base64.getDecoder().decode(PRIVATE_KEY_STRING);
        PKCS8EncodedKeySpec priKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        PrivateKey privateKey = keyFactory.generatePrivate(priKeySpec);

        Cipher decryptCipher = Cipher.getInstance("RSA");
        decryptCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = decryptCipher.doFinal(Base64.getDecoder().decode(encryptedToken));
        String decryptedToken = new String(decryptedBytes, "UTF-8");

        System.out.println("Decrypted Token: " + decryptedToken);
    }
}

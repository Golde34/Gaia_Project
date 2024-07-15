import javax.crypto.Cipher;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

public class RSATokenGenerate {
    public static void main(String[] args) throws Exception {
        // Bước 1: Tạo cặp khóa RSA
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
        keyPairGen.initialize(1024);
        KeyPair keyPair = keyPairGen.generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        System.out.println("Public key: " + Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        System.out.println("Private key: " + Base64.getEncoder().encodeToString(privateKey.getEncoded()));
        // Dữ liệu để mã hóa
        String token = "Golde34";

        // Bước 2: Mã hóa dữ liệu bằng public key
        Cipher encryptCipher = Cipher.getInstance("RSA");
        encryptCipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedBytes = encryptCipher.doFinal(token.getBytes("UTF-8"));
        String encryptedToken = Base64.getEncoder().encodeToString(encryptedBytes);

        System.out.println("Encrypted Token: " + encryptedToken);

        // Bước 3: Giải mã dữ liệu bằng private key
        Cipher decryptCipher = Cipher.getInstance("RSA");
        decryptCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = decryptCipher.doFinal(Base64.getDecoder().decode("FNW5IyIMh/JOCQZw0ntWBGhX5t8L4YF1Z2b/5u4t8T1zlJcYnNBmavmSpmSo/WYBajRy6sdEl2prdUpq368S8j3X31ObgtC+2lzWuIwRdYKdCEoCRxs5pzCFeBz37/mBXxKlVokJgH7pqIiB5Chk3HhlXIF7FF6l/nU35s3LRgk="));
        String decryptedToken = new String(decryptedBytes, "UTF-8");

        System.out.println("Decrypted Token: " + decryptedToken);
    }
}

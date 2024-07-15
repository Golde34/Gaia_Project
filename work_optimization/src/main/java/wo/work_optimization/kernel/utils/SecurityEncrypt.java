package wo.work_optimization.kernel.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.enums.ServiceEnum;

import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Component
public class SecurityEncrypt {
    @Value("${app.service.security.public-key}")
    private String PUBLIC_KEY_STRING;
    private static final String FORMAT_PUBLIC_KEY = "%s::%s::%s"; // Service::Token::UserId

    @Value("${app.service.security.service-token}")
    private String serviceToken;

    public String encrypt(String plainText) throws Exception {
        // Get public key from string value
        byte[] publicKeyBytes = Base64.getDecoder().decode(PUBLIC_KEY_STRING);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);

        String encryptedText = String.format(FORMAT_PUBLIC_KEY,
                ServiceEnum.AS.getServiceName(), serviceToken, plainText);

        Cipher encryptCipher = Cipher.getInstance("RSA");
        encryptCipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedBytes = encryptCipher.doFinal(encryptedText.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
}

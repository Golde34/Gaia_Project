package auth.authentication_service.securities;

import lombok.Data;

import java.util.List;

@Data
public class ActivateUserStore {

    private List<String> users;

}
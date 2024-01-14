package auth.authentication_service.enums;

public enum BossType {
   BOSS("BOSS", "Use when gaia automatically sign in by boss command"),
   USER("USER", "Use when user sign in in website");

    private String value;
    private String description;

    BossType(String value) {
        this.value = value;
    }

    BossType(String value, String description) {
        this.value = value;
        this.description = description;
    }

    public String getValue() { return value; }

    public String getDescription() { return description; }
}

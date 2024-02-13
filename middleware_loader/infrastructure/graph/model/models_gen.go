// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AuthTokenResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	Name         string `json:"name"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	LastLogin    string `json:"lastLogin"`
	BossType     string `json:"bossType"`
	Role         string `json:"role"`
	GaiaHealth   string `json:"gaiaHealth"`
}

type Comment struct {
	ID           string `json:"id"`
	Content      string `json:"content"`
	ActiveStatus string `json:"activeStatus"`
	CreatedAt    string `json:"createdAt"`
	UpdatedAt    string `json:"updatedAt"`
	Task         string `json:"task"`
}

type CreateProjectInput struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	Owner        string `json:"owner"`
	ActiveStatus string `json:"activeStatus"`
}

type CreateTaskInput struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	GroupTaskID  string   `json:"groupTaskId"`
}

type GroupTask struct {
	ID             string   `json:"id"`
	Title          string   `json:"title"`
	Description    string   `json:"description"`
	Priority       []string `json:"priority"`
	Status         string   `json:"status"`
	OrdinalNumber  string   `json:"ordinalNumber"`
	ActiveStatus   string   `json:"activeStatus"`
	Project        string   `json:"project"`
	Tasks          []string `json:"tasks"`
	TotalTasks     int      `json:"totalTasks"`
	CompletedTasks int      `json:"completedTasks"`
	CreatedAt      string   `json:"createdAt"`
	UpdatedAt      string   `json:"updatedAt"`
}

type IDInput struct {
	ID string `json:"id"`
}

type Project struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Status       string   `json:"status"`
	Color        string   `json:"color"`
	ActiveStatus string   `json:"activeStatus"`
	GroupTasks   []string `json:"groupTasks"`
	Owner        string   `json:"owner"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
}

type SigninInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SubTask struct {
	ID           string   `json:"id"`
	Mission      string   `json:"mission"`
	Deadline     string   `json:"deadline"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	ActiveStatus string   `json:"activeStatus"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
	Task         string   `json:"task"`
}

type Task struct {
	ID           string   `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
	GroupTask    string   `json:"groupTask"`
	SubTasks     []string `json:"subTasks"`
	Comments     []string `json:"comments"`
}

type TokenInput struct {
	Token string `json:"token"`
}

type TokenResponse struct {
	ID          string `json:"id"`
	Username    string `json:"username"`
	AccessToken string `json:"accessToken"`
	ExpiryDate  string `json:"expiryDate"`
}

type UpdateColorInput struct {
	ID    string `json:"id"`
	Color string `json:"color"`
}

type UpdateObjectNameInput struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type UpdateProjectInput struct {
	ProjectID    string `json:"projectId"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	Owner        string `json:"owner"`
	ActiveStatus string `json:"activeStatus"`
}

type UpdateTaskInput struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	TaskID       string   `json:"taskId"`
}

type User struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Enabled    bool   `json:"enabled"`
	IsUsing2fa bool   `json:"isUsing2FA"`
	Secret     string `json:"secret"`
	CreatedAt  string `json:"createdAt"`
	UpdatedAt  string `json:"updatedAt"`
}

type UserPermissionInput struct {
	UserID       string `json:"userId"`
	PermissionID string `json:"permissionId"`
}

type UserPermissionResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

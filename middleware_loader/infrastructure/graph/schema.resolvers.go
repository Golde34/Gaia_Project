package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"
	"fmt"
	auth_services "middleware_loader/core/services/auth_services"
	task_manager "middleware_loader/core/services/task_manager"
	work_optim "middleware_loader/core/services/work_optimization"
	"middleware_loader/infrastructure/graph/model"
)

var authService = auth_services.NewAuthService()
var taskService = task_manager.NewTaskService()
var projectService = task_manager.NewProjectService()
var userService = auth_services.NewUserService()
var groupTaskService = task_manager.NewGroupTaskService()
var roleService = auth_services.NewRoleService()
var privilegeService = auth_services.NewPrivilegeService()
var taskRegisterService = work_optim.NewTaskRegisterService()
var noteService = task_manager.NewNoteService()

// RegisterTaskConfig is the resolver for the registerTaskConfig field.
func (r *mutationResolver) RegisterTaskConfig(ctx context.Context, input model.RegisterTaskInput) (*model.RegisterTaskConfig, error) {
	result, err := taskRegisterService.RegisterTaskConfig(ctx, input)
	return &result, err
}

// IsTaskExisted is the resolver for the isTaskExisted field.
func (r *mutationResolver) IsTaskExisted(ctx context.Context, input model.UserIDInput) (*model.IsTaskExisted, error) {
	result, err := taskRegisterService.IsTaskExisted(ctx, input)
	return &result, err
}

// IsScheduleExisted is the resolver for the isScheduleExisted field.
func (r *mutationResolver) IsScheduleExisted(ctx context.Context, input model.UserIDInput) (*model.IsScheduleExisted, error) {
	result, err := taskRegisterService.IsScheduleExisted(ctx, input)
	return &result, err
}

// QueryTaskConfig is the resolver for the queryTaskConfig field.
func (r *mutationResolver) QueryTaskConfig(ctx context.Context, input model.UserIDInput) (*model.IsTaskConfigExisted, error) {
	result, err := taskRegisterService.QueryTaskConfig(ctx, input)
	return &result, err
}

// Signin is the resolver for the signin field.
func (r *mutationResolver) Signin(ctx context.Context, input model.SigninInput) (*model.AuthTokenResponse, error) {
	authToken, err := authService.Signin(ctx, input)
	return &authToken, err
}

// GaiaAutoSignin is the resolver for the gaiaAutoSignin field.
func (r *mutationResolver) GaiaAutoSignin(ctx context.Context, input model.SigninInput) (*model.AuthTokenResponse, error) {
	authToken, err := authService.GaiaAutoSignin(ctx, input)
	return &authToken, err
}

// CheckToken is the resolver for the checkToken field.
func (r *mutationResolver) CheckToken(ctx context.Context, input model.TokenInput) (*model.TokenResponse, error) {
	authToken, err := authService.CheckToken(ctx, input)
	return &authToken, err
}

// CheckPermission is the resolver for the checkPermission field.
func (r *mutationResolver) CheckPermission(ctx context.Context, input model.UserPermissionInput) (*model.UserPermissionResponse, error) {
	panic(fmt.Errorf("not implemented: CheckPermission - checkPermission"))
}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.CreateUserInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: CreateUser - createUser"))
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUserInput) (*model.UpdateUser, error) {
	user, err := userService.UpdateUser(ctx, input)
	return &user, err
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, input model.UserInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: DeleteUser - deleteUser"))
}

// CreateRole is the resolver for the createRole field.
func (r *mutationResolver) CreateRole(ctx context.Context, input model.RoleInput) (*model.Role, error) {
	role, err := roleService.CreateRole(ctx, input)
	return &role, err
}

// UpdateRole is the resolver for the updateRole field.
func (r *mutationResolver) UpdateRole(ctx context.Context, input model.RoleInput) (*model.Role, error) {
	panic(fmt.Errorf("not implemented: UpdateRole - updateRole"))
}

// DeleteRole is the resolver for the deleteRole field.
func (r *mutationResolver) DeleteRole(ctx context.Context, input model.RoleInput) (*model.Role, error) {
	panic(fmt.Errorf("not implemented: DeleteRole - deleteRole"))
}

// CreatePrivilege is the resolver for the createPrivilege field.
func (r *mutationResolver) CreatePrivilege(ctx context.Context, input model.PrivilegeInput) (*model.Privilege, error) {
	panic(fmt.Errorf("not implemented: CreatePrivilege - createPrivilege"))
}

// UpdatePrivilege is the resolver for the updatePrivilege field.
func (r *mutationResolver) UpdatePrivilege(ctx context.Context, input model.PrivilegeInput) (*model.Privilege, error) {
	panic(fmt.Errorf("not implemented: UpdatePrivilege - updatePrivilege"))
}

// DeletePrivilege is the resolver for the deletePrivilege field.
func (r *mutationResolver) DeletePrivilege(ctx context.Context, input model.PrivilegeInput) (*model.Privilege, error) {
	panic(fmt.Errorf("not implemented: DeletePrivilege - deletePrivilege"))
}

// CreateProject is the resolver for the createProject field.
func (r *mutationResolver) CreateProject(ctx context.Context, input model.CreateProjectInput) (*model.Project, error) {
	project, err := projectService.CreateProject(ctx, input)
	return &project, err
}

// UpdateProject is the resolver for the updateProject field.
func (r *mutationResolver) UpdateProject(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error) {
	project, err := projectService.UpdateProject(ctx, input)
	return &project, err
}

// DeleteProject is the resolver for the deleteProject field.
func (r *mutationResolver) DeleteProject(ctx context.Context, input model.IDInput) (*model.Project, error) {
	project, err := projectService.DeleteProject(ctx, input)
	return &project, err
}

// UpdateProjectName is the resolver for the updateProjectName field.
func (r *mutationResolver) UpdateProjectName(ctx context.Context, input model.UpdateObjectNameInput) (*model.Project, error) {
	project, err := projectService.UpdateProjectName(ctx, input)
	return &project, err
}

// UpdateProjectColor is the resolver for the updateProjectColor field.
func (r *mutationResolver) UpdateProjectColor(ctx context.Context, input model.UpdateColorInput) (*model.Project, error) {
	project, err := projectService.UpdateProjectColor(ctx, input)
	return &project, err
}

// ArchiveProject is the resolver for the archiveProject field.
func (r *mutationResolver) ArchiveProject(ctx context.Context, input model.IDInput) (*model.Project, error) {
	panic(fmt.Errorf("not implemented: ArchiveProject - archiveProject"))
}

// EnableProject is the resolver for the enableProject field.
func (r *mutationResolver) EnableProject(ctx context.Context, input model.IDInput) (*model.Project, error) {
	project, err := projectService.EnableProject(ctx, input)
	return &project, err
}

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	task, err := taskService.CreateTask(ctx, input)
	return &task, err
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	task, err := taskService.UpdateTask(ctx, input)
	return &task, err
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, input model.IDInput) (*model.Task, error) {
	task, err := taskService.DeleteTask(ctx, input)
	return &task, err
}

// GenerateTaskWithoutGroupTask is the resolver for the generateTaskWithoutGroupTask field.
func (r *mutationResolver) GenerateTaskWithoutGroupTask(ctx context.Context, input model.GenerateTaskWithoutGroupTaskInput) (*model.Task, error) {
	task, err := taskService.GenerateTaskWithoutGroupTask(ctx, input)
	return &task, err
}

// UpdateTaskInDialog is the resolver for the updateTaskInDialog field.
func (r *mutationResolver) UpdateTaskInDialog(ctx context.Context, input model.UpdateTaskInDialogInput) (*model.Task, error) {
	task, err := taskService.UpdateTaskInDialog(ctx, input)
	return &task, err
}

// MoveTask is the resolver for the moveTask field.
func (r *mutationResolver) MoveTask(ctx context.Context, input model.MoveTaskInput) (*model.Task, error) {
	task, err := taskService.MoveTask(ctx, input)
	return &task, err
}

// ArchiveTask is the resolver for the archiveTask field.
func (r *mutationResolver) ArchiveTask(ctx context.Context, input model.IDInput) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: ArchiveTask - archiveTask"))
}

// Enable is the resolver for the enable field.
func (r *mutationResolver) Enable(ctx context.Context, input model.IDInput) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: Enable - enable"))
}

// CreateGroupTask is the resolver for the createGroupTask field.
func (r *mutationResolver) CreateGroupTask(ctx context.Context, input model.CreateGroupTaskInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.CreateGroupTask(ctx, input)
	return &groupTask, err
}

// UpdateGroupTask is the resolver for the updateGroupTask field.
func (r *mutationResolver) UpdateGroupTask(ctx context.Context, input model.UpdateGroupTaskInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.UpdateGroupTask(ctx, input)
	return &groupTask, err
}

// DeleteGroupTask is the resolver for the deleteGroupTask field.
func (r *mutationResolver) DeleteGroupTask(ctx context.Context, input model.IDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.DeleteGroupTask(ctx, input)
	return &groupTask, err
}

// UpdateGroupTaskName is the resolver for the updateGroupTaskName field.
func (r *mutationResolver) UpdateGroupTaskName(ctx context.Context, input model.UpdateObjectNameInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.UpdateGroupTaskName(ctx, input)
	return &groupTask, err
}

// CalculateCompletedTasks is the resolver for the calculateCompletedTasks field.
func (r *mutationResolver) CalculateCompletedTasks(ctx context.Context, input model.IDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.CalculateCompletedTasks(ctx, input)
	return &groupTask, err
}

// UpdateOrdinalNumber is the resolver for the updateOrdinalNumber field.
func (r *mutationResolver) UpdateOrdinalNumber(ctx context.Context, input model.ProjectGroupTaskIDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.UpdateGroupTaskOrdinal(ctx, input)
	return &groupTask, err
}

// ArchieveGroupTask is the resolver for the archieveGroupTask field.
func (r *mutationResolver) ArchieveGroupTask(ctx context.Context, input model.IDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.ArchiveGroupTask(ctx, input)
	return &groupTask, err
}

// EnableGroupTask is the resolver for the enableGroupTask field.
func (r *mutationResolver) EnableGroupTask(ctx context.Context, input model.IDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.EnableGroupTask(ctx, input)
	return &groupTask, err
}

// CreateNote is the resolver for the createNote field.
func (r *mutationResolver) CreateNote(ctx context.Context, input model.CreateNoteInput) (*model.Note, error) {
	note, err := noteService.CreateNote(ctx, input)
	return &note, err
}

// LockNote is the resolver for the lockNote field.
func (r *mutationResolver) LockNote(ctx context.Context, input model.LockNoteInput) (*model.Note, error) {
	note, err := noteService.LockNote(ctx, input)
	return &note, err
}

// UnlockNote is the resolver for the unlockNote field.
func (r *mutationResolver) UnlockNote(ctx context.Context, input model.UnlockNoteInput) (*model.Note, error) {
	note, err := noteService.UnlockNote(ctx, input)
	return &note, err
}

// ListAllUsers is the resolver for the listAllUsers field.
func (r *queryResolver) ListAllUsers(ctx context.Context) ([]*model.ListAllUsers, error) {
	users, err := userService.ListAllUsers(ctx)
	modelUser := []*model.ListAllUsers{}
	for _, user := range users {
		userCopy := user
		modelUser = append(modelUser, &userCopy)
	}
	return modelUser, err
}

// GetUserByUsername is the resolver for the getUserByUsername field.
func (r *queryResolver) GetUserByUsername(ctx context.Context, input model.UserInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: GetUserByUsername - getUserByUsername"))
}

// GetUserDetail is the resolver for the getUserDetail field.
func (r *queryResolver) GetUserDetail(ctx context.Context, input model.IDInput) (*model.User, error) {
	user, err := userService.GetUserDetail(ctx, input)
	return &user, err
}

// GetAllRoles is the resolver for the getAllRoles field.
func (r *queryResolver) GetAllRoles(ctx context.Context) ([]*model.Role, error) {
	roles, err := roleService.GetAllRoles(ctx)
	modelRole := []*model.Role{}
	for _, role := range roles {
		roleCopy := role
		modelRole = append(modelRole, &roleCopy)
	}
	return modelRole, err
}

// GetRoleByName is the resolver for the getRoleByName field.
func (r *queryResolver) GetRoleByName(ctx context.Context, input model.RoleInput) (*model.Role, error) {
	panic(fmt.Errorf("not implemented: GetRoleByName - getRoleByName"))
}

// GetAllPrivileges is the resolver for the getAllPrivileges field.
func (r *queryResolver) GetAllPrivileges(ctx context.Context) ([]*model.ListPrivilegeResponse, error) {
	privileges, err := privilegeService.GetAllPrivileges(ctx)
	modelPrivilege := []*model.ListPrivilegeResponse{}
	for _, privilege := range privileges {
		privilegeCopy := privilege
		modelPrivilege = append(modelPrivilege, &privilegeCopy)
	}
	return modelPrivilege, err
}

// GetPrivilegeByName is the resolver for the getPrivilegeByName field.
func (r *queryResolver) GetPrivilegeByName(ctx context.Context, input model.PrivilegeInput) (*model.Privilege, error) {
	panic(fmt.Errorf("not implemented: GetPrivilegeByName - getPrivilegeByName"))
}

// ListAllProjects is the resolver for the listAllProjects field.
func (r *queryResolver) ListAllProjects(ctx context.Context) ([]*model.Project, error) {
	projects, err := projectService.ListAll(ctx)
	modelProject := []*model.Project{}
	for _, project := range projects {
		projectCopy := project
		modelProject = append(modelProject, &projectCopy)
	}
	return modelProject, err
}

// GetProjectByID is the resolver for the getProjectById field.
func (r *queryResolver) GetProjectByID(ctx context.Context, input model.IDInput) (*model.Project, error) {
	project, err := projectService.GetById(ctx, input.ID)
	return &project, err
}

// GetGroupTaskInProject is the resolver for the getGroupTaskInProject field.
func (r *queryResolver) GetGroupTasksInProject(ctx context.Context, input model.IDInput) ([]*model.GroupTask, error) {
	groupTasks, err := projectService.GetGroupTasksInProject(ctx, input.ID)
	modelGroupTask := []*model.GroupTask{}
	for _, groupTask := range groupTasks {
		groupTaskCopy := groupTask
		modelGroupTask = append(modelGroupTask, &groupTaskCopy)
	}
	return modelGroupTask, err
}

// GetGroupTaskByID is the resolver for the getGroupTaskById field.
func (r *queryResolver) GetGroupTaskByID(ctx context.Context, input model.IDInput) (*model.GroupTask, error) {
	groupTask, err := groupTaskService.GetGroupTaskById(ctx, input)
	return &groupTask, err
}

// GetTasksByGroupTaskID is the resolver for the getTasksByGroupTaskId field.
func (r *queryResolver) GetTasksByGroupTaskID(ctx context.Context, input model.IDInput) (*model.TaskDashboard, error) {
	taskDashboard, err := groupTaskService.GetTasksByGroupTask(ctx, input)
	return &taskDashboard, err
}

// ListAllTasks is the resolver for the listAllTasks field.
func (r *queryResolver) ListAllTasks(ctx context.Context) ([]*model.Task, error) {
	task, err := taskService.ListAllTasks(ctx)
	modelTask := []*model.Task{}
	for _, task := range task {
		taskCopy := task
		modelTask = append(modelTask, &taskCopy)
	}
	return modelTask, err
}

// GetTaskByID is the resolver for the getTaskById field.
func (r *queryResolver) GetTaskByID(ctx context.Context, input model.IDInput) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: GetTaskByID - getTaskById"))
}

// GetTaskTableByGroupTaskID is the resolver for the getTaskTableByGroupTaskId field.
func (r *queryResolver) GetTaskTableByGroupTaskID(ctx context.Context, input model.IDInput) (*model.TaskTable, error) {
	taskTable, err := groupTaskService.GetTaskTableByGroupTask(ctx, input)
	return &taskTable, err
}

// GetAllNotes is the resolver for the getAllNotes field.
func (r *queryResolver) GetAllNotes(ctx context.Context, input model.IDInput) ([]*model.Note, error) {
	notes, err := noteService.GetAllNotes(ctx, input)
	modelNote := []*model.Note{}
	for _, note := range notes {
		noteCopy := note
		modelNote = append(modelNote, &noteCopy)
	}
	return modelNote, err
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

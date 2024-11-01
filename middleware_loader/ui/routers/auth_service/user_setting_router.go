package routers

// import services "middleware_loader/core/services/auth_services"

type UserSettingRouter struct {
	// UserSettingService *services.UserSettingService
}

// func NewUserSettingRouter(userSettingService *services.UserSettingService) *UserSettingRouter {
// 	r.Route("/user-setting", func(r chi.Router) {
// 		r.Use(middleware.CheckMicroserviceStatus(db, enums.AUTH_SERVICE))
// 		r.Get("/get-all-user-settings", func(w http.ResponseWriter, r *http.Request) {
// 			controller.GetAllUserSettings(w, r, userSettingService)
// 		})
	
// 	return &UserSettingRouter{
// 		// UserSettingService: userSettingService,
// 	}
// }
gaia:
	cd GAIA && python __main__.py --process

gaia-debug:
	cd GAIA && python __debug__.py

gaia-train-model:
	cd GAIA && python __main__.py --train-model

gaia-kafka:
	cd GAIA && python __main__.py --kafka

authentication:
	cd authentication_manager/auth_service && java -jar target/auth_service-0.0.1.jar

camera-cv:
	cd camera_cv && python app_router.py

client-gui:
	cd client-gui && npm run dev

gaia-connector: 
	cd gaia_connector && python app_router.py

middleware:
	cd middleware_loader && go run cmd/main.go

task-manager:
	cd person_task_manager/server && npm run dev

schedule:
	cd schedule_plan && npm run dev

work-optimization:
	cd work_optimization && java -jar target/work_optimization-0.0.1.jar
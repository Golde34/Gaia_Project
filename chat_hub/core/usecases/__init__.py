from infrastructure.rag.semantic_router.route import Route
from infrastructure.rag.semantic_router.router import SemanticRouter
from core.domain.enums import SemanticRouteSetupEnum
from core.service.chat_service import ChatService
from core.service.create_task_service import CreateTaskService


SERVICE_FACTORY = {
    'chitchat': Route(name=SemanticRouteSetupEnum.chitchat.value, service=ChatService),
    'create_task': Route(name=SemanticRouteSetupEnum.create_task.value, service=CreateTaskService),
}

routes_list = list(SERVICE_FACTORY.values())
semantic_router = SemanticRouter(routes=routes_list)
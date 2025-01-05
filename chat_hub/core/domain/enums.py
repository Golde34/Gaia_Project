from enum import Enum


class SemanticRouteSetupEnum(Enum):
    create_task = 'create_task'
    query_task = 'query_task'
    optimize_task = 'optimize_task'
    update_task = 'update_task'
    delete_task = 'delete_task'
    archive_task = 'archive_task'
    unarchive_task = 'unarchive_task'
    list_task = 'list_task'
    chitchat = 'chitchat'

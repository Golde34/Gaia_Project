package domains

object Constants {

    object KafkaTopic {
        final val SOR_TRAINING_MODEL: String = "gc.sor-training-model.topic"
        final val CREATE_TASK: String = "gc.create-task.topic"
    }

    object KafkaCmd {
        final val ACTIVATE_DATA_LAKE_SAVING: String = "activateDataLakeSaving"
    }

    object TaskStatus {
        final val PENDING: String = "PENDING"
        final val TODO: String = "TODO"
        final val IN_PROGRESS: String = "IN PROGRESS"
        final val DONE: String = "DONE"
    }
}

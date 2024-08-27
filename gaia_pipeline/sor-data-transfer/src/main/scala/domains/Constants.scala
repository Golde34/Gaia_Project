package domains

object Constants {

    object StringConstants {
        final val EMPTY_SENTENCE: String = "This task has no sentence"
    }

    object KafkaTopic {
        final val SOR_TRAINING_MODEL: String = "gaia.sor-training-model.topic"
        final val CREATE_TASK: String = "task-manager.create-task.topic"
    }

    object KafkaCmd {
        final val CSV_SAVING: String = "saveOutputToCSV"
        final val DATABASE_SAVING: String = "saveOutputToDatabase"
        final val ALL_SAVING: String = "saveOutputToAll"

        final val GAIA_CREATE_TASK: String = "gaia-create-task"
        final val TM_CREATE_TASK: String = "tm-create-task"
    }

    object TaskStatus {
        final val PENDING: String = "PENDING"
        final val TODO: String = "TODO"
        final val IN_PROGRESS: String = "IN PROGRESS"
        final val DONE: String = "DONE"
    }
}

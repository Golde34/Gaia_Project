package domains

case class ActivateDataLakeSaving(
  isSaving: Boolean
)

case class TaskInput(
  sentence: String,
  project: String,
  title: String,
  priority: String,
  status: String,
  startDate: String,
  deadline: String,
  duration: String
)

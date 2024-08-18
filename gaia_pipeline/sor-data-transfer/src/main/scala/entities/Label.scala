package entities

case class LabelEntity(
    start: Int,
    end: Int,
    label: String
)

case class SpacyData(
    sentence: String,
    labels: Seq[LabelEntity]
)

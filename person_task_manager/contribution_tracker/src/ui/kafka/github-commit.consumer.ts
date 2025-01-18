import { KafkaCommand } from "../../core/domain/enums/kafka.enums";
import { commitUsecase } from "../../core/usecase/commit.usecase";

export const githubCommitConsumerMessageHandler = (message: string) => {
    const kafkaMessage = JSON.parse(message);
    const cmd = kafkaMessage.cmd;
    switch (cmd) {
        case KafkaCommand.SYNC_GITHUB_COMMIT:
            commitUsecase.syncGithubCommit(kafkaMessage.data);
            break;
        default:
            console.warn("No handler for command: ", cmd);
    }
}
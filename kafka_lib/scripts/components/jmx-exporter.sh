mkdir -p jmx-exporter
curl https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.19.0/jmx_prometheus_javaagent-0.19.0.jar \
  -o jmx-exporter/jmx_prometheus_javaagent-0.19.0.jar
curl  https://raw.githubusercontent.com/prometheus/jmx_exporter/main/example_configs/kafka-2_0_0.yml \
  -o jmx-exporter/kafka-2_0_0.yml

kafka-0:
    <<: *kafka-common
    environment:
      <<: *kafka-env-common
      KAFKA_CFG_NODE_ID: 0
    volumes:
      - kafka_0_data:/bitnami/kafka
      - ./jmx-exporter:/opt/jmx-exporter

kafka-1:
    <<: *kafka-common
    environment:
      <<: *kafka-env-common
      KAFKA_CFG_NODE_ID: 1
    volumes:
      - kafka_1_data:/bitnami/kafka
      - ./jmx-exporter:/opt/jmx-exporter


x-kafka-env-common: &kafka-env-common
  ALLOW_PLAINTEXT_LISTENER: 'yes'
  KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE: 'true'
  KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@kafka-0:9093,1@kafka-1:9093
  KAFKA_KRAFT_CLUSTER_ID: abcdefghijklmnopqrstuv
  KAFKA_CFG_PROCESS_ROLES: controller,broker
  KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
  KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
  EXTRA_ARGS: "-Xms128m -Xmx256m -javaagent:/opt/jmx-exporter/jmx_prometheus_javaagent-0.19.0.jar=9404:/opt/jmx-exporter/kafka-2_0_0.yml"

docker compose exec kafka-0 curl localhost:9404

kafka:
  clusters:
    - bootstrapServers: kafka-0:9092,kafka-1:9092
      name: kafka
      metrics:
        type: JMX
        port: 9404
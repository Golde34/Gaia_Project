mkdir -p grafana/provisioning/datasources
mkdir -p grafana/provisioning/dashboards
touch grafana/provisioning/datasources/datasource.yml
touch grafana/provisioning/dashboards/dashboard.yml
curl https://raw.githubusercontent.com/strimzi/strimzi-kafka-operator/main/examples/metrics/grafana-dashboards/strimzi-kafka-exporter.json -o grafana/dashboards/strimzi-kafka-exporter.json
curl https://raw.githubusercontent.com/strimzi/strimzi-kafka-operator/main/examples/metrics/grafana-dashboards/strimzi-kafka.json -o grafana/dashboards/strimzi-kafka.json


# ...
apiVersion: 1

deleteDatasources:
  - name: Prometheus
    orgId: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    orgId: 1
    url: http://prometheus:9090
    password:
    user:
    database:
    basicAuth: false
    basicAuthUser:
    basicAuthPassword:
    withCredentials:
    isDefault: true
    version: 1
    editable: false

# ...
apiVersion: 1

providers:
  - name: 'dashboards-from-file'
    orgId: 1
    folder: ''
    folderUid: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: false
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: true
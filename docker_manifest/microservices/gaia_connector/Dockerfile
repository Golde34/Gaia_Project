FROM python:3.10-slim

WORKDIR /backend/gaia_connector

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-dev \
    default-libmysqlclient-dev \
    gcc \
    build-essential \
    pkg-config \
    libssl-dev \
    libffi-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

ARG ENV_FILE=.env.docker
COPY ${ENV_FILE} /app/.env

EXPOSE 5000

CMD ["python", "app_router.py"]

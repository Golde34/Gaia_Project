FROM python:3.9-slim

WORKDIR /backend/gaia_connector

COPY . . 

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "gaia_connector/app_router.py"]
FROM python:3.9-slim

WORKDIR /backend/GAIA

COPY . . 

RUN pip install --no-cache-dir -r requirements.txt

CMD ["cd GAIA", "python", "__main__.py --process"]
FROM python:3.10.4

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

WORKDIR /api

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x /api/script.sh

EXPOSE 8000

ENTRYPOINT [ "/api/script.sh" ]

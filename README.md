# Setup env

## deploy


1. create .env file from .env.example
```
cp .env.example .env
```
2. build image:
```
docker build -t app .
```

3. run container
```
docker run -d --name app-name app
```
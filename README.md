# Building docker images

```
docker build -f filename . -t tagname
docker build -f front.Dockerfile . -t cooletijdgast/discord-web-frontend
```

# Pushing docker image

```
docker push tagname
docker push cooletijdgast/discord-web-frontend
```

# Starting the app
```
npm start
```
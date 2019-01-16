FROM alpine
RUN apk update && apk add nodejs && apk add npm && npm install --save express mariadb body-parser && npm install -g nodemon 
COPY . /app
WORKDIR /app
CMD ["nodemon"]
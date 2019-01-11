FROM alpine
RUN apk update && apk add nodejs && apk add npm && npm install --save express mysql body-parser && npm install -g nodemon
COPY . /app
WORKDIR /app
CMD ["nodemon"]
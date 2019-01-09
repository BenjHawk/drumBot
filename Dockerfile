FROM alpine
RUN apk update 
RUN apk add nodejs 
RUN apk add npm 
RUN npm install -g @angular/cli
COPY . /app
WORKDIR /app
EXPOSE 4200
CMD ["ng", "serve"]
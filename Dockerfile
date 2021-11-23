# build stage
FROM golang:alpine AS build-env

ENV WDIR techmaster-wordpress

WORKDIR /$WDIR

COPY go.mod .

COPY go.sum .

COPY . .

RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' 

FROM node:latest AS webpack-dist

WORKDIR /app/view

COPY /package.json ./

COPY /webpack.* ./

RUN yarn install

RUN mkdir -p ./src

COPY /src ./src

RUN yarn run build

# final stage
FROM alpine:latest

RUN mkdir -p app/ /app/dist

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy result binary go app to /app folder
COPY --from=build-env techmaster-wordpress/landing-wordpress app/
COPY --from=webpack-dist app/view/dist/ /app/dist

ENTRYPOINT ["./landing-wordpress"]

EXPOSE 9382
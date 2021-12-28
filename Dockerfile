# build stage
FROM golang:alpine AS build-env

WORKDIR /

RUN apk add upx

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -ldflags '-w'

RUN upx -9 /$WDIR/landing-wordpress

# final stage
FROM alpine:latest

RUN mkdir -p app/ /app/dist

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy result binary go app to /app folder
COPY --from=build-env /landing-wordpress /app
COPY --from=build-env /dist/ /app/dist

ENTRYPOINT ["./landing-wordpress"]

EXPOSE 9382

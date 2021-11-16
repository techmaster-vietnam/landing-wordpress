# build stage
FROM golang:1.15-alpine AS build-env

ENV WDIR techmaster-game

WORKDIR /$WDIR

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' 

# final stage
FROM alpine:latest

RUN mkdir -p app/ /app/dist

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy result binary go app to /app folder
COPY --from=build-env /techmaster-game/landing-game /app/
COPY --from=build-env /techmaster-game/dist/ /app/dist

ENTRYPOINT ["./landing-game"]

EXPOSE 8382
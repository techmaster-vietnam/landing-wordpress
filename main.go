package main

import "github.com/gofiber/fiber/v2"

func main() {
  app := fiber.New()

  app.Static("/","./dist",fiber.Static{
		Compress: true,
		MaxAge: 8760 * 3600,
	})

  app.Listen(":9382")
}
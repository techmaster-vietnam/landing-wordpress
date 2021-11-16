package main

import "github.com/gofiber/fiber/v2"

func main() {
  app := fiber.New()


  app.Static("/","./dist",fiber.Static{
		Compress: true,
		MaxAge: 8760 * 3600,
	})

  app.Get("/", func(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{})
  })

  app.Listen(":8382")
}
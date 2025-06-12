import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Detective Conan API")
    .setDescription("A REST API about Detective Conan")
    .setVersion("1.0")
    // .addTag('example') // Optional: Add tags for grouping endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document); // Swagger UI will be available at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

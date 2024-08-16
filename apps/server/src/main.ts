import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Watchtower API")
		.setDescription("Watchtower REST API")
		.setVersion("0.0.1")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api", app, document);
	app.use("/v3/api-docs", (req: Request, res: Response) => res.json(document));

	await app.listen(3000);
}
bootstrap();

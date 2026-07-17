import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);
	// Lets DrizzleCrudModule close the DB pool on shutdown (onModuleDestroy).
	app.enableShutdownHooks();

	const port = Number(process.env.PORT ?? 4000);
	await app.listen(port);
	console.log(`API listening on http://localhost:${port}`);
}

void bootstrap();

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleCrudModule } from "nestjs-drizzle-crud";
import { CountriesModule } from "./countries/countries.module";
import * as schema from "./db/schema";
import { TagsModule } from "./tags/tags.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		// Configure the connection once. The tables have no soft-delete column,
		// so disable it globally; created_at/updated_at exist, so keep timestamps.
		DrizzleCrudModule.forRootAsync({
			useFactory: () => {
				const connectionString = process.env.DATABASE_URL;
				if (!connectionString) {
					throw new Error("DATABASE_URL is not set");
				}
				return {
					dialect: "postgresql" as const,
					connectionString,
					schema,
					defaults: { softDelete: false, timestamps: true },
				};
			},
		}),
		CountriesModule,
		TagsModule,
	],
})
export class AppModule {}

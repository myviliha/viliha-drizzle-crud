import { Module } from "@nestjs/common";
import { DrizzleCrudModule } from "nestjs-drizzle-crud";
import { countries, regions } from "../db/schema";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";

@Module({
	imports: [
		DrizzleCrudModule.forFeature([
			{
				service: CountriesService,
				table: countries,
				config: {
					primaryKey: "id",
					primaryKeyType: "serial",
					// belongs-to: countries.region_id -> regions.id
					relations: {
						region: { table: regions, localKey: "region_id" },
					},
					defaultSort: [{ column: "name", order: "asc" }],
				},
			},
		]),
	],
	controllers: [CountriesController],
})
export class CountriesModule {}

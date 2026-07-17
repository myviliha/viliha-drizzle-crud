import { Module } from "@nestjs/common";
import { DrizzleCrudModule } from "nestjs-drizzle-crud";
import { tags } from "../db/schema";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
	imports: [
		DrizzleCrudModule.forFeature([
			{
				service: TagsService,
				table: tags,
				config: {
					primaryKey: "id",
					primaryKeyType: "uuid",
					defaultSort: [{ column: "name", order: "asc" }],
				},
			},
		]),
	],
	controllers: [TagsController],
})
export class TagsModule {}

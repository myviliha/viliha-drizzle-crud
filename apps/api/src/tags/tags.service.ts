import { SqlBaseCrudService } from "nestjs-drizzle-crud";
import type { tags } from "../db/schema";
import type { CreateTagDto } from "./dto/create-tag.dto";

export type Tag = typeof tags.$inferSelect;

// Demonstrates a uuid primary key (primaryKeyType: "uuid").
export class TagsService extends SqlBaseCrudService<
	Tag,
	CreateTagDto,
	CreateTagDto,
	Partial<Tag>
> {}

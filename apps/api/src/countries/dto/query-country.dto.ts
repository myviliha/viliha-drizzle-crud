import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

// Query params for GET /countries. Pagination/sort/search/withRegion are pulled
// out by the controller; the remaining fields (name/code/region_id) become the
// CRUD filter object.
export class QueryCountryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	limit?: number;

	@IsOptional()
	@IsString()
	sortBy?: string;

	@IsOptional()
	@IsIn(["asc", "desc"])
	sortOrder?: "asc" | "desc";

	@IsOptional()
	@IsString()
	search?: string;

	// `?withRegion=true` eager-loads the related region.
	@IsOptional()
	@IsIn(["true", "false"])
	withRegion?: string;

	// --- filters ---
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	code?: string;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	region_id?: number;
}

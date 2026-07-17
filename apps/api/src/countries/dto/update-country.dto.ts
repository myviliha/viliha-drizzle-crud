import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCountryDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string;

	@IsOptional()
	@IsString()
	@MaxLength(255)
	code?: string;

	@IsOptional()
	@IsInt()
	region_id?: number;
}

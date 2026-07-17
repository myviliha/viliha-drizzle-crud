import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCountryDto {
	@IsString()
	@MaxLength(255)
	name!: string;

	@IsString()
	@MaxLength(255)
	code!: string;

	@IsOptional()
	@IsInt()
	region_id?: number;
}

import type { SqlCrudConfig } from "../core/interfaces/sql-crud-config.interface";

export function CrudService(
	config: Omit<SqlCrudConfig, "db" | "table"> & { table: any },
): ClassDecorator {
	return (target: any) => {
		// Store the config as metadata
		Reflect.defineMetadata("crud:config", config, target);
		return target;
	};
}

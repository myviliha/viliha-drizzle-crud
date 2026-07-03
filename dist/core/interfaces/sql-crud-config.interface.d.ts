import { PrimaryKeyType, SortColumn, SqlDialect } from "../types/sql.types";
export interface RelationConfig {
    table: any;
    localKey: string;
    references?: string;
}
export type RelationsConfig = Record<string, RelationConfig>;
export type SqlSearchMode = "ilike" | "fullText";
export interface SqlSearchOptions {
    term: string;
    columns: string[];
    mode?: SqlSearchMode;
}
export interface SqlCrudConfig {
    dialect: SqlDialect;
    db: any;
    table: any;
    primaryKey: string;
    primaryKeyType: PrimaryKeyType;
    softDelete?: {
        enabled: boolean;
        column: string;
    };
    timestamps?: {
        createdAt: string;
        updatedAt: string;
    };
    pagination?: {
        defaultLimit: number;
        maxLimit: number;
    };
    defaultSort?: SortColumn[];
    sql?: {
        caseSensitive: boolean;
        useReturning: boolean;
        jsonSupport: boolean;
        enableFullTextSearch: boolean;
    };
    relations?: RelationsConfig;
}
export interface SqlOperationOptions {
    transaction?: any;
    relations?: string[];
    select?: string[];
    search?: SqlSearchOptions;
    hooks?: {
        skipBefore?: boolean;
        skipAfter?: boolean;
    };
    lock?: "update" | "share" | "none";
    forNoKeyUpdate?: boolean;
}

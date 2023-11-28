export type JsonPrimitive = boolean | null | number | string;

export type JsonObject = { [k in string]?: JsonValue };

export type JsonArray = JsonValue[];

/**
 * @deprecated Use `JsonValue` from `json/common` instead.
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

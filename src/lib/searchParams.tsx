import { parseAsFloat, createLoader, parseAsBoolean } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  step: parseAsFloat.withDefault(1),
  wantToBeDriver: parseAsBoolean.withDefault(false),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

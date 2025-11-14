import { PAGINATION } from "@/config/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

export const workflowsParams = {
	page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE),
	pageSize: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE),
	search: parseAsString.withDefault(""),
};

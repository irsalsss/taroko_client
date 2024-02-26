import { accountHandlers } from "@/handlers/account/account-handlers";
import { setupServer } from "msw/node";

const handlers = [
  ...accountHandlers
]

export const server = setupServer(...handlers);

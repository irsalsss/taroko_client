import { env } from "@/constants/env";
import { MOCK_LIST_ACCOUNT } from "@/mocks/account/account-mock";
import { rest } from "msw";

export const accountHandlers = [
  rest.get(env.API_URL + "/api/contacts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success Get Contact List!",
        data: MOCK_LIST_ACCOUNT
      })
    );
  }),
]
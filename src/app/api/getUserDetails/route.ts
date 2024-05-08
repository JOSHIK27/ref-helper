import { currentUser } from "@clerk/nextjs/server";

import { CheckForDetails } from "@/lib/utils";
export async function GET(req: Request, res: Response) {
  const user = await currentUser();
  const details = await CheckForDetails(user?.primaryEmailAddressId);
  return Response.json({ details });
}

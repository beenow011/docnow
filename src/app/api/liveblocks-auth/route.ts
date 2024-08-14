import { liveblocks } from "@/lib/liveblock";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors";
import { redirect } from "next/navigation";
// import { Liveblocks } from "@liveblocks/node";

// const liveblocks = new Liveblocks({
//   secret: "sk_dev_NPE5haJJXWl9cxGRG5IuNASMKhd3mX_ZRlDmGdldx-cg-R5NxWbTZIe0WNzqe3E7",
// });

export async function POST(request: Request) {
    const clerkUser = await currentUser()
    if(!clerkUser){
        redirect('/sign-in')
    }
  // Get the current user from your database
//   const user = __getUserFromDB__(request);
    const {id, firstName,lastName,emailAddresses,imageUrl} = clerkUser
const user = {
    id,
    info:{
        id,
        name:`${firstName} ${lastName}`,
        email:emailAddresses[0].emailAddress,
        avatar : imageUrl,
        color: getUserColor(id)
    }
}

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[], // Optional
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}
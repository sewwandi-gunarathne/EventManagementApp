import { getSeverSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export async function authorizeRole(context, allowedRoles = []) {
    const session = await getSeverSession(context.req, context.res, authOptions);

    if (!session || !allowedRoles.includes(session.user.role)) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    return { props: { session } }

}
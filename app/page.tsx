import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import CommunityContainer from "./components/CommunityContainer";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Flex direction="row" justify={"end"}>
        {user ? (
          <Flex direction="row" gap="2">
            <Link href="/admin">
              <Button size="1" variant="soft" style={{ cursor: "pointer" }}>
                Add profile
              </Button>
            </Link>
            <form action="/auth/sign-out" method="post">
              <Button
                size="1"
                variant="soft"
                style={{ cursor: "pointer" }}
                color="orange"
              >
                Log Out
              </Button>
            </form>
          </Flex>
        ) : (
          <Link href="/login">
            <Button size="1" variant="soft" style={{ cursor: "pointer" }}>
              Admin Sign In
            </Button>
          </Link>
        )}
      </Flex>
      <CommunityContainer />
    </div>
  );
}

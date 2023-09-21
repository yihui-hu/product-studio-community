import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminForm from "../components/AdminForm";
import { Button } from "@radix-ui/themes";

const Admin = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Link href="/">
        <Button size="1" variant="soft" style={{ cursor: "pointer" }}>
          Back to home
        </Button>
      </Link>
      <AdminForm />
    </div>
  );
};

export default Admin;

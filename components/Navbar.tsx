import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineLanguage } from "react-icons/md";
import Cookies from "js-cookie";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";
import { useRouter } from "next/router";
import Link from "next/link";
import LanguageMenu from "./ui/LanguageMenu";
import { useTranslation } from "next-i18next";

function Navbar() {
  const { t } = useTranslation();
  const [signOut] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();
  const logOut = async () => {
    await signOut();
    Cookies.remove("loggedin");
    router.push("/");
  };
  return (
    <Menubar>
      <Link href="/" className="flex-1">
        Noteline.
      </Link>
      <div className="flex items-center justify-center">
        <MenubarMenu>
          <Link
            className="rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
            href="/dashboard"
          >
            {t("common:dashboard")}
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <LanguageMenu />
        </MenubarMenu>
        {user ? (
          <MenubarMenu>
            <MenubarTrigger className="p-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.photoURL ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={logOut}>{t("common:logout")}</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          <Link
            className="rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
            href="login"
          >
            {t("common:login")}
          </Link>
        )}
      </div>
    </Menubar>
  );
}

export default Navbar;

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

function Navbar() {
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
      <div className="flex gap-4 items-center justify-center">
        <Link href="/dashboard" className="flex-1">
          Dashboard
        </Link>
        <MenubarMenu>
          <MenubarTrigger>
            <MdOutlineLanguage className="text-xl" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/" locale="en">
                <span className="fi fi-gb rounded mr-2"></span> English
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/" locale="fr">
                <span className="fi fi-fr rounded mr-2"></span> Français
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {user && (
          <MenubarMenu>
            <MenubarTrigger className="p-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.photoURL ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={logOut}>logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </div>
    </Menubar>
  );
}

export default Navbar;

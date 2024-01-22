import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MdOutlineLanguage } from "react-icons/md";

function LanguageMenu() {
  const [currentPath, setCurrentPath] = useState("/");
  const router = useRouter();
  useEffect(() => {
    // Get the current path
    const currentPath = router.asPath;
    setCurrentPath(currentPath);
  }, [router]);

  return (
    <>
      <MenubarTrigger>
        <MdOutlineLanguage className="text-xl" />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Link scroll={false} href={currentPath} locale="en">
            <span className="fi fi-gb rounded mr-2"></span> English
          </Link>
        </MenubarItem>
        <MenubarItem>
          <Link scroll={false} href={currentPath} locale="fr">
            <span className="fi fi-fr rounded mr-2"></span> Français
          </Link>
        </MenubarItem>
        <MenubarItem>
          <Link scroll={false} href={currentPath} locale="ar">
            <span className="fi fi-dz rounded mr-2"></span> العربية
          </Link>
        </MenubarItem>
      </MenubarContent>
    </>
  );
}

export default LanguageMenu;

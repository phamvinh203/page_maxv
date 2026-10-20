import Link from "next/link";

import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink, navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { headerNavigation } from "@/app/_lib/navigation";

export function DesktopNav() {
  return (
    <NavigationMenu aria-label="Điều hướng chính" viewport={false} className="hidden xl:flex">
      <NavigationMenuList className="gap-0">
        {headerNavigation.map((group) => (
          <NavigationMenuItem key={group.title}>
            {group.items ? (
              <>
                <NavigationMenuTrigger className="px-3 text-xs font-medium text-foreground">{group.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-60 p-2">
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild className="px-3 py-2.5 text-muted-foreground">
                          <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} px-3 text-xs text-foreground`}>
                <Link href={group.href}>{group.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Messages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink asChild>
                <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" to="/messages">
                  <div className="text-sm font-medium leading-none">All Messages</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View and manage all your SMS messages
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" to="/messages/new">
                  <div className="text-sm font-medium leading-none">New Message</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Send a new SMS message
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Devices</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink asChild>
                <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" to="/devices">
                  <div className="text-sm font-medium leading-none">Connected Devices</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Manage your connected devices
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" to="/devices/new">
                  <div className="text-sm font-medium leading-none">Add Device</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Connect a new device to SMSBridge
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/settings">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

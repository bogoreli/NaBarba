import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import SidebarSheet from "./sidebar-sheet"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between">
        <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header

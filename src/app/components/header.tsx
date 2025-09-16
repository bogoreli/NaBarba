import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MenuIcon } from "lucide-react"
import Image from "next/image"

const Header = () => {
  return (
    <Card className="rounded-0">
      <CardContent className="flex flex-row items-center justify-between">
        <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header

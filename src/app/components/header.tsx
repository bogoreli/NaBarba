import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import { quickSearchOptions } from "./quickSearch"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

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
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-2">
              <Avatar>
                <AvatarImage
                  src={
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              </Avatar>
              <div>
                <p className="font-bold">Kevin bogoreli</p>
                <p className="text-xs">bogoreli.kevin@outlook.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-2">
              <Button className="justify-start">
                <Link href={"/"} />
                <HomeIcon size={18} />
                Ínicio
              </Button>
              <Button className="justify-start" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-2">
              {quickSearchOptions.map((option) => (
                <Button
                  className="justify-start gap-2"
                  variant="ghost"
                  key={option.title}
                >
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={18}
                    height={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-2">
              <Button className="justify-start text-sm" variant={"ghost"}>
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header

import { quickSearchOptions } from "./quickSearch"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"

const SidebarSheet = () => {
  return (
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
        <Button className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} />
            Ínicio
          </Link>
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
  )
}

export default SidebarSheet

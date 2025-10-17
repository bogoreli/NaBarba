"use client"
import { quickSearchOptions } from "./quickSearch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { authClient } from "@/lib/auth-client"

const SidebarSheet = () => {
  const { data: session } = authClient.useSession()

  const handleLogoutClick = async () => {
    authClient.signOut()
    window.location.href = "/"
  }
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-2">
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.user?.name?.split(" ")?.[0]?.[0]}
                {session?.user?.name?.split(" ")?.[1]?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold">{session.user.name}</p>
              <p className="text-xs">{session.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Olá faça o seu login</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"}>
                  <LogInIcon size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma!</DialogTitle>
                  <DialogDescription>
                    Crie sua conta ou conecte-se usando uma conta existente
                  </DialogDescription>
                </DialogHeader>
                <Button className="font-bold" asChild>
                  <Link href={"/authentication"}>Fazer login</Link>
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 border-b border-solid p-2">
        <Button className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} />
            Ínicio
          </Link>
        </Button>
        <Button className="justify-start" variant="ghost" asChild>
          <Link href={"/bookings"}>
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid p-2">
        {quickSearchOptions.map((option) => (
          <Button
            className="justify-start gap-2"
            variant="ghost"
            key={option.title}
            asChild
          >
            <Link href={`/barbershops/?service=${option.title}`}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={18}
                height={18}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-2">
        {session?.user && (
          <Button
            onClick={handleLogoutClick}
            className="justify-start text-sm"
            variant={"ghost"}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        )}
      </div>
    </SheetContent>
  )
}

export default SidebarSheet

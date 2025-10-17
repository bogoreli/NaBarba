"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BookingWithRelations } from "@/types/booking"
import { isFuture, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteBooking } from "../actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"

interface BookingItemProps {
  booking: BookingWithRelations
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
      setIsSheetOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar a reserva. Tente novamente.")
    }
  }

  const isConfirmed = isFuture(new Date(booking.date))
  const date = new Date(booking.date)
  const month = date.toLocaleString("pt-BR", { month: "long" })
  const day = date.getDate()
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-bold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">{month}</p>
              <p className="text-2xl">{day}</p>
              <p className="text-sm">{time}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[85%] p-5">
        <SheetHeader>
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            fill
            className="rounded-xl object-cover"
            alt="localização"
          />

          <Card className="z-50 mx-5 mb-2 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="space-y-2 !pt-0">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm">Data</h2>
                <p className="text-sm">{date.toLocaleDateString("pt-BR")}</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm">Horário</h2>
                <p className="text-sm">
                  {format(date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm">Barbearia</h2>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {booking.service.barbershop.phones.map((phone) => (
            <PhoneItem key={phone.id} phone={phone} />
          ))}
        </div>

        {/* Botões ajustados dinamicamente */}
        <div
          className={`mt-6 flex w-full gap-3 ${
            isConfirmed ? "" : "justify-center"
          }`}
        >
          <SheetClose asChild>
            <Button
              variant="outline"
              className={isConfirmed ? "w-1/2" : "w-full"}
            >
              Voltar
            </Button>
          </SheetClose>

          {isConfirmed && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-1/2">
                  Cancelar reserva
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Você quer cancelar a reserva?</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja cancelar essa reserva? Essa ação não
                    pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-1/2">
                      Voltar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="w-1/2"
                      onClick={handleCancelBooking}
                    >
                      Confirmar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem

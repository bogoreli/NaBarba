"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { barbershopServices, barbershops } from "@/db/schema"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createBooking } from "../actions/create-booking"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { getBookings } from "../actions/get-bookings"
import type { Booking } from "../actions/get-bookings"
import { addDays } from "date-fns"
import { ne } from "drizzle-orm"

export type BarbershopService = typeof barbershopServices.$inferSelect

export interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<typeof barbershops.$inferSelect, "name">
}

const TIME_LIST = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const [hours, minutes] = time.split(":").map(Number)

    const hasBookingOnCurrentTime = bookings.some((booking) => {
      const bookingDate = new Date(booking.date)
      return (
        bookingDate.getHours() === hours && bookingDate.getMinutes() === minutes
      )
    })

    return !hasBookingOnCurrentTime
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen((open) => !open)
  }

  const { data: session } = authClient.useSession()
  const handleDateSelect = (date: Date | undefined) => setSelectedDay(date)
  const handleTimeSelect = (time: string) => setSelectedTime(time)
  const handleCreateBooking = async () => {
    if (!session?.user) {
      toast.error("Você precisa estar logado para reservar.")
      return
    }

    if (!selectedDay || !selectedTime) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const date = new Date(selectedDay)
    date.setHours(hours, minutes, 0, 0)

    await createBooking({
      serviceId: service.id,
      userId: session.user.id,
      date,
    })

    toast.success("Reserva criada com sucesso!")
  }
  return (
    <Card className="p-2">
      <CardContent className="flex items-center gap-3">
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-between space-y-3">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              <SheetTrigger asChild>
                <Button variant={"secondary"}>Reservar</Button>
              </SheetTrigger>

              <SheetContent className="py-0">
                <div className="flex justify-center">
                  <SheetHeader>
                    <SheetTitle className="justify-center">
                      Fazer Reserva
                    </SheetTitle>
                  </SheetHeader>
                </div>

                <div className="flex justify-center border-b border-solid">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    disabled={{ before: new Date() }}
                    onSelect={handleDateSelect}
                    className="w-[320px]"
                    styles={{
                      head_cell: { width: "100%", textTransform: "capitalize" },
                      cell: { width: "100%" },
                      button: { width: "100%" },
                      nav_button_previous: { width: "32px", height: "32px" },
                      nav_button_next: { width: "32px", height: "32px" },
                      caption: { textTransform: "capitalize" },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className="bordel-solid flex flex-col gap-3 border-b p-5">
                    {/* Botões de horário */}
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {getTimeList(dayBookings).map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="mb-2 rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>

                    {/* Resumo da reserva + SheetFooter */}
                    {selectedTime && (
                      <>
                        <div className="p-5">
                          <Card>
                            <CardContent className="space-y-2 !pt-0">
                              <div className="flex items-center justify-between">
                                <h2 className="font-bold">{service.name}</h2>
                                <p className="text-sm font-bold">
                                  {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(Number(service.price))}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <h2 className="text-sm">Data</h2>
                                <p className="text-sm">
                                  {selectedDay?.toLocaleDateString("pt-BR")}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <h2 className="text-sm">Horário</h2>
                                <p className="text-sm">{selectedTime}</p>
                              </div>

                              <div className="flex items-center justify-between">
                                <h2 className="text-sm">Barbearia</h2>
                                <p className="text-sm">{barbershop.name}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <SheetFooter>
                          <SheetClose asChild>
                            <Button onClick={handleCreateBooking}>
                              Finalizar reserva
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem

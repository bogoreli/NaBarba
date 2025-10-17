import Header from "./components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { db } from "@/db"
import { barbershops, bookings as bookingsSchema } from "@/db/schema"
import BarbershopItem from "./components/barbershop-item"
import { and, asc, eq, gt } from "drizzle-orm"
import { quickSearchOptions } from "./components/quickSearch"
import BookingItem from "./components/bookingItem"
import Search from "./components/search"
import Link from "next/link"
import { api } from "@/lib/auth"
import { headers } from "next/headers"

const Home = async () => {
  const session = await api.getSession({
    headers: headers(),
  })

  // lista de barbearias
  const barbershopsList = await db.select().from(barbershops)

  const popularBarbershops = await db
    .select()
    .from(barbershops)
    .orderBy(asc(barbershops.name))

  const confirmedBookings = session?.user
    ? await db.query.bookings.findMany({
        where: and(
          eq(bookingsSchema.userId, session.user.id),
          gt(bookingsSchema.date, new Date()),
        ),
        with: {
          service: {
            with: {
              barbershop: true,
            },
          },
        },
        orderBy: (bookings, { asc }) => [asc(bookings.date)],
      })
    : []

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session?.user.name : "bem-vindo"}!
        </h2>
        <p>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops/?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 min-h-[150px] w-full">
          <Image
            alt="Banner barbearia"
            src="/bannerBarbearia.png"
            fill
            className="rounded-xl object-cover"
            unoptimized
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
              AGENDAMENTOS
            </h2>

            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
          RECOMENDADOS
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershopsList.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">POPULARES</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

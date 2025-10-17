import { api } from "@/lib/auth"
import { db } from "@/db"
import { eq, gt, lt, and } from "drizzle-orm"
import { bookings } from "@/db/schema"
import { headers } from "next/headers"
import Header from "../components/header"
import BookingItem from "../components/bookingItem"

export default async function BookingsPage() {
  const session = await api.getSession({
    headers: headers(),
  })

  const confirmedBookings = await db.query.bookings.findMany({
    where: and(
      eq(bookings.userId, session?.user.id),
      gt(bookings.date, new Date()),
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

  // Reservas passadas (concluídas)
  const concludedBookings = await db.query.bookings.findMany({
    where: and(
      eq(bookings.userId, session?.user.id),
      lt(bookings.date, new Date()),
    ),
    with: {
      service: {
        with: {
          barbershop: true,
        },
      },
    },
    orderBy: (bookings, { desc }) => [desc(bookings.date)],
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-semibold">Minhas Reservas</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
              CONFIRMADOS
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
              FINALIZADOS
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

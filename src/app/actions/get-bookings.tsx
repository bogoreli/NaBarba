"use server"

import { db } from "@/db"
import { bookings } from "@/db/schema"
import { and, eq, gte, lte } from "drizzle-orm"
import { startOfDay, endOfDay } from "date-fns"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ serviceId, date }: GetBookingsProps) => {
  const results = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.serviceId, serviceId),
        gte(bookings.date, startOfDay(date)),
        lte(bookings.date, endOfDay(date))
      )
    )

  return results
}

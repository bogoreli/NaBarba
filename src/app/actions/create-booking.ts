"use server"

import { db } from "@/db"
import { bookings } from "@/db/schema"

interface CreateBookingProps {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async ({
  userId,
  serviceId,
  date,
}: CreateBookingProps) => {
  await db.insert(bookings).values({
    userId,
    serviceId,
    date,
  })
}

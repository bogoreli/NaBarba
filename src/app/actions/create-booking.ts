"use server"

import { db } from "@/db"
import { bookings } from "@/db/schema"
import { revalidatePath } from "next/cache"

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
  revalidatePath("/barbershops/[id]")
}

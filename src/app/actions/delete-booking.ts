"use server"

import { db } from "@/db"
import { bookings } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteBooking = async (bookingId: string) => {
  await db.delete(bookings).where(eq(bookings.id, bookingId))

  revalidatePath("/bookings")
  revalidatePath("/")
}

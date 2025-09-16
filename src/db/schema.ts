import { pgTable, uuid, text, timestamp, decimal } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// ---------- USERS ----------
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}))

// ---------- BARBERSHOPS ----------
export const barbershop = pgTable("barbershops", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phones: text("phones").array(), // array de texto no Postgres
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const barbershopsRelations = relations(barbershop, ({ many }) => ({
  services: many(barbershopServices),
}))

// ---------- BARBERSHOP SERVICES ----------
export const barbershopServices = pgTable("barbershop_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  barbershopId: uuid("barbershop_id")
    .notNull()
    .references(() => barbershop.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const barbershopServicesRelations = relations(
  barbershopServices,
  ({ one, many }) => ({
    barbershop: one(barbershop, {
      fields: [barbershopServices.barbershopId],
      references: [barbershop.id],
    }),
    bookings: many(bookings),
  }),
)

// ---------- BOOKINGS ----------
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => barbershopServices.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  service: one(barbershopServices, {
    fields: [bookings.serviceId],
    references: [barbershopServices.id],
  }),
}))

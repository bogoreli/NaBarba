import {
  pgTable,
  uuid,
  text,
  timestamp,
  decimal,
  boolean,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// ---------- USERS ----------
export const users = pgTable("users", {
  id: text("id").primaryKey(), // cuid do Better Auth
  name: text("name"),
  email: text("email"),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

// ---------- SESSION ----------
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

// ---------- ACCOUNT ----------
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

// ---------- RELATIONS ----------
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}))

// ---------- BARBERSHOPS ----------
export const barbershops = pgTable("barbershops", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phones: text("phones").array(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const barbershopsRelations = relations(barbershops, ({ many }) => ({
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
    .references(() => barbershops.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const barbershopServicesRelations = relations(
  barbershopServices,
  ({ one, many }) => ({
    barbershop: one(barbershops, {
      fields: [barbershopServices.barbershopId],
      references: [barbershops.id],
    }),
    bookings: many(bookings),
  }),
)

// ---------- BOOKINGS ----------
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id") // mudou de uuid para text
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

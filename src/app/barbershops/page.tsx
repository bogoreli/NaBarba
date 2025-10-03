import { db } from "@/db"
import { barbershops } from "@/db/schema"
import { ilike, or } from "drizzle-orm"
import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import Search from "../components/search"

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams

  const Barbershops = await db
    .select()
    .from(barbershops)
    .where(
      or(
        ilike(barbershops.name, `%${search ?? ""}%`),
        ilike(barbershops.description, `%${search ?? ""}%`),
      ),
    )

  return (
    <div>
      <Header />
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
          Resultados para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage

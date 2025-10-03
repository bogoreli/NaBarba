import { db } from "@/db"
import { barbershops } from "@/db/schema"
import { ilike, or } from "drizzle-orm"
import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import Search from "../components/search"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  // 👇 await uma vez só
  const { title, service } = await searchParams

  const Barbershops = await db
    .select()
    .from(barbershops)
    .where(
      or(
        ilike(barbershops.name, `%${title ?? ""}%`),
        ilike(barbershops.description, `%${service ?? ""}%`),
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
          {title ? (
            <>Resultados para &quot;{title}&quot;</>
          ) : service ? (
            <>Resultados para &quot;{service}&quot;</>
          ) : (
            "Todas as barbearias"
          )}
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

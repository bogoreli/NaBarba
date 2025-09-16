import { Input } from "@/components/ui/input"
import Header from "./components/header"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/db"
import { barbershop } from "@/db/schema"
import BarbershopItem from "./components/barbershop-item"
import { asc } from "drizzle-orm"
import { quickSearchOptions } from "./components/quickSearch"
import BookingItem from "./components/bookingItem"

const Home = async () => {
  const barbershops = await db.select().from(barbershop)
  const popularBarbershops = await db
    .select()
    .from(barbershop)
    .orderBy(asc(barbershop.name))

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Kevin</h2>
        <p>Segunda feira, 15 de setembro</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner barbearia"
            src="/bannerBarbearia.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
          RECOMENDADOS
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
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

      <footer>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">
              © 2025 NaBarba. Todos os direitos reservados.
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home

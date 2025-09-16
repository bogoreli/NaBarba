import { Input } from "@/components/ui/input"
import Header from "./components/header"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { db } from "@/db"
import { barbershop } from "@/db/schema"
import BarbershopItem from "./components/barbershop-item"

const Home = async () => {
  const barbershops = await db.select().from(barbershop)
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
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner barbearia"
            src="/bannerBarbearia.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
          AGENDAMENTOS
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-bold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia vintage</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Setembro</p>
              <p className="text-2xl">15</p>
              <p className="text-sm">18:00</p>
            </div>
          </CardContent>
        </Card>
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-500">
          RECOMENDADOS
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

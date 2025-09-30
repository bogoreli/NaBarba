import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { barbershopServices } from "@/db/schema"
import Image from "next/image"

export type BarbershopService = typeof barbershopServices.$inferSelect

interface ServiceItemProps {
  service: BarbershopService // um único serviço
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="p-2">
      <CardContent className="flex items-center gap-3">
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-between space-y-3">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant={"secondary"}>Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem

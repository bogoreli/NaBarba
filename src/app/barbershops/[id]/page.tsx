import PhoneItem from "@/app/components/phone-item"
import ServiceItem from "@/app/components/service-item"
import SidebarSheet from "@/app/components/sidebar-sheet"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { db } from "@/db"
import { barbershops, barbershopServices } from "@/db/schema" // ← plural aqui
import { eq } from "drizzle-orm"
import { ChevronsLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = params

  // busca 1 barbearia
  const [barbershopData] = await db
    .select()
    .from(barbershops)
    .where(eq(barbershops.id, id))

  // busca serviços da barbearia
  const services = await db
    .select()
    .from(barbershopServices)
    .where(eq(barbershopServices.barbershopId, id))

  if (!barbershopData) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershopData.imageUrl}
          alt={barbershopData.name}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4 p-2"
          asChild
        >
          <Link href="/">
            <ChevronsLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 p-2"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h1 className="text-xl font-bold">{barbershopData.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershopData.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5.0 (499 Avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershopData.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershopData.phones?.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage

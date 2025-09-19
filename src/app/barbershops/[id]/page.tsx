import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { barbershop } from "@/db/schema"
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
  const { id } = await params
  const barbershops = await db
    .select()
    .from(barbershop)
    .where(eq(barbershop.id, id))

  const barbershopData = barbershops[0]

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

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 p-2"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
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
    </div>
  )
}

export default BarbershopPage

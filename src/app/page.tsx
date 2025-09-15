import { Input } from "@/components/ui/input"
import Header from "./components/header"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

const Home = () => {
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
      </div>
    </div>
  )
}

export default Home

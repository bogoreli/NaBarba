import { Card, CardContent } from "@/components/ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="mt-6">
        <CardContent>
          <p className="text-sm text-gray-500">
            © 2025 NaBarba. Todos os direitos reservados.
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer

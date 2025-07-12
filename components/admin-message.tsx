import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

interface AdminMessageProps {
  title: string
  date: string
  content: string
}

export function AdminMessage({ title, date, content }: AdminMessageProps) {
  return (
    <Card className="border-pink-600/30 bg-black/60 hover:bg-black/70 transition-colors duration-300 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
        <div className="text-sm text-gray-400 flex items-center">
          <CalendarDays size={14} className="mr-1" />
          {date}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{content}</p>
      </CardContent>
    </Card>
  )
}

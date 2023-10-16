import { MoonEclipsesInfo } from '@/components/MoonEclipsesInfo'
import { Carousel } from '@/components/Slider/Slider'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Carousel />
      <MoonEclipsesInfo />
    </main>
  )
}

import { MoonPhaseCard } from '@/components/MoonPhaseCard'
import { findNextEclipses } from '@/utils/astronomyUtils'
import { SolarEclipseInfoCard } from './SolarEclipseInfoCard'
import { getId } from '@/utils/utils'

export async function MoonEclipsesInfo() {
  const eclipses = await findNextEclipses()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 my-5 g font-Space p-4">
      <MoonPhaseCard />
      {eclipses.map((eclipse) => (
        <SolarEclipseInfoCard info={eclipse} key={getId()} />
      ))}
    </div>
  )
}

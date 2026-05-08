import { Blinds } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Blind | Blinds Manufacturing & Installation Services',
  description: 'Specialised in blinds installation, quality products and manufacturing for residential and commercial properties in Mauritius.'
}

export default function PrimeBlindPage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-blind')!
  return <CompanyPageTemplate company={company} IconComponent={Blinds} />
}

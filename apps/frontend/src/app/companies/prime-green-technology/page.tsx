import { Leaf } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Green Technology | Solar & Wind Energy Solutions',
  description: 'Specialised in solar systems, wind turbine systems and renewable energy solutions in Mauritius.'
}

export default function PrimeGreenTechnologyPage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-green-technology')!
  return <CompanyPageTemplate company={company} IconComponent={Leaf} />
}

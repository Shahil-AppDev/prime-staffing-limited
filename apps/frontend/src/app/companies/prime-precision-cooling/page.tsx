import { Snowflake } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Precision Cooling | Plumbing, Electrical & Air Conditioning Services',
  description: 'Specialised in plumbing, electrical works, air conditioning installation, servicing and maintenance across Mauritius.'
}

export default function PrimePrecisionCoolingPage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-precision-cooling')!
  return <CompanyPageTemplate company={company} IconComponent={Snowflake} />
}

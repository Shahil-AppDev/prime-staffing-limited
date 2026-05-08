import { Heart } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Health Care | Medical Goods Distribution Services',
  description: 'Specialised in medical goods and products distribution, including medicine distribution for clinics and pharmacies across Mauritius.'
}

export default function PrimeHealthCarePage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-health-care')!
  return <CompanyPageTemplate company={company} IconComponent={Heart} />
}

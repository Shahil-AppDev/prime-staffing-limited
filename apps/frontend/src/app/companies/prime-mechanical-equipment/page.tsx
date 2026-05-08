import { Truck } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Mechanical Equipment | Transportation & Logistics Services',
  description: 'Specialised in transportation of goods and services, logistics support and mechanical equipment solutions in Mauritius.'
}

export default function PrimeMechanicalEquipmentPage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-mechanical-equipment')!
  return <CompanyPageTemplate company={company} IconComponent={Truck} />
}

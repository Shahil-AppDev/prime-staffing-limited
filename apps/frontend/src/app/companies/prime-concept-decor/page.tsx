import { Paintbrush } from 'lucide-react'
import { sisterCompanies } from '@/lib/prime-group-data'
import CompanyPageTemplate from '@/components/CompanyPageTemplate'

export const metadata = {
  title: 'Prime Concept Decor | Interior & Exterior Decoration Services',
  description: 'Specialised in interior and exterior decoration, aluminium works, carpentry and all types of renovation for homes, offices, apartments and commercial spaces in Mauritius.'
}

export default function PrimeConceptDecorPage() {
  const company = sisterCompanies.find(c => c.slug === 'prime-concept-decor')!
  return <CompanyPageTemplate company={company} IconComponent={Paintbrush} />
}

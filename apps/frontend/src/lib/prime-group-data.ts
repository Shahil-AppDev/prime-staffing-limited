export interface SisterCompany {
  name: string
  slug: string
  sector: string
  shortDescription: string
  fullDescription: string
  services: string[]
  icon: string
  email: string
  phone: string[]
  accentColor: string
  gradient: string
}

export const sisterCompanies: SisterCompany[] = [
  {
    name: 'Prime Concept Decor',
    slug: 'prime-concept-decor',
    sector: 'Interior & Exterior Decoration',
    shortDescription: 'Specialised in interior and exterior decoration, aluminium works, carpentry and all types of renovation for homes, offices, apartments and commercial spaces.',
    fullDescription: 'Prime Concept Decor is your trusted partner for comprehensive decoration and renovation solutions in Mauritius. We specialise in transforming residential and commercial spaces through expert interior design, exterior finishing, aluminium fabrication, and custom carpentry. Our experienced team delivers quality craftsmanship and attention to detail in every project, from small renovations to complete property transformations.',
    services: [
      'Interior decoration',
      'Exterior decoration',
      'Aluminium works',
      'Carpentry',
      'Home renovation',
      'Office renovation',
      'Apartment renovation',
      'Custom finishing works'
    ],
    icon: 'Paintbrush',
    email: 'decor@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-amber-500 to-orange-600',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
  },
  {
    name: 'Prime Precision Cooling',
    slug: 'prime-precision-cooling',
    sector: 'Plumbing, Electrical & Air Conditioning',
    shortDescription: 'Specialised in plumbing, electrical works, air conditioning installation, servicing and maintenance.',
    fullDescription: 'Prime Precision Cooling provides comprehensive technical services for residential and commercial properties across Mauritius. Our certified technicians deliver expert plumbing solutions, electrical installations, and air conditioning services with a focus on reliability and efficiency. We offer 24/7 emergency support and preventive maintenance programs to ensure your systems operate at peak performance year-round.',
    services: [
      'Plumbing services',
      'Electrical installation',
      'Electrical maintenance',
      'Air conditioning installation',
      'AC servicing',
      'Cooling maintenance',
      'Emergency repairs'
    ],
    icon: 'Snowflake',
    email: 'cooling@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-blue-500 to-cyan-600',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)'
  },
  {
    name: 'Prime Mechanical Equipment',
    slug: 'prime-mechanical-equipment',
    sector: 'Transportation & Logistics',
    shortDescription: 'Specialised in transportation of goods and services, logistics support and mechanical equipment solutions.',
    fullDescription: 'Prime Mechanical Equipment delivers reliable transportation and logistics solutions for businesses across Mauritius. We provide comprehensive goods transport services, equipment logistics, and operational support tailored to your commercial needs. Our modern fleet and experienced team ensure safe, timely delivery of your cargo, whether for regular operations or specialized equipment transport.',
    services: [
      'Goods transportation',
      'Service logistics',
      'Equipment transport',
      'Operational support',
      'Commercial delivery solutions'
    ],
    icon: 'Truck',
    email: 'mechanical@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-slate-600 to-gray-800',
    gradient: 'linear-gradient(135deg, #475569 0%, #1f2937 100%)'
  },
  {
    name: 'Prime Green Technology',
    slug: 'prime-green-technology',
    sector: 'Renewable Energy Solutions',
    shortDescription: 'Specialised in solar systems, wind turbine systems and renewable energy solutions.',
    fullDescription: 'Prime Green Technology leads the way in sustainable energy solutions for Mauritius. We design, install, and maintain solar power systems and wind turbine installations for residential, commercial, and industrial applications. Our renewable energy experts help you reduce energy costs, minimize environmental impact, and achieve energy independence through cutting-edge green technology and professional service.',
    services: [
      'Solar system installation',
      'Solar maintenance',
      'Wind turbine systems',
      'Renewable energy consulting',
      'Energy efficiency solutions'
    ],
    icon: 'Leaf',
    email: 'green@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-green-500 to-emerald-600',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #059669 100%)'
  },
  {
    name: 'Prime Blind',
    slug: 'prime-blind',
    sector: 'Blinds Manufacturing & Installation',
    shortDescription: 'Specialised in blinds installation, quality products and manufacturing.',
    fullDescription: 'Prime Blind manufactures and installs premium window blinds for residential and commercial properties throughout Mauritius. We offer custom-made blinds in a wide range of styles, materials, and colors to suit any interior design. Our professional measurement, manufacturing, and installation service ensures perfect fit and lasting quality for every window treatment solution.',
    services: [
      'Blinds installation',
      'Custom blinds manufacturing',
      'Quality blind products',
      'Residential blinds',
      'Commercial blinds',
      'Measurement and fitting service'
    ],
    icon: 'Blinds',
    email: 'blinds@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-purple-500 to-indigo-600',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)'
  },
  {
    name: 'Prime Health Care',
    slug: 'prime-health-care',
    sector: 'Medical Goods Distribution',
    shortDescription: 'Specialised in different types of medical goods and products, including medicine distribution.',
    fullDescription: 'Prime Health Care is a trusted distributor of medical goods and pharmaceutical products across Mauritius. We supply clinics, pharmacies, and healthcare facilities with quality medical equipment, healthcare products, and medicines. Our reliable distribution network and commitment to healthcare standards ensure that medical professionals have access to the supplies they need to serve their communities.',
    services: [
      'Medical goods distribution',
      'Medical product supply',
      'Healthcare products',
      'Medicine distribution',
      'Clinic and pharmacy supply',
      'Medical equipment sourcing'
    ],
    icon: 'Heart',
    email: 'healthcare@primegroupltd.com',
    phone: ['+230 5538 1294', '+230 5252 5071'],
    accentColor: 'from-red-500 to-rose-600',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #e11d48 100%)'
  }
]

export const primeGroupInfo = {
  name: 'Prime Group Ltd',
  tagline: 'Building diversified solutions for modern businesses and communities.',
  description: 'Prime Group Ltd is a diversified Mauritian business group operating across decoration, cooling, mechanical services, renewable energy, blinds manufacturing and healthcare distribution.',
  phone: ['+230 5538 1294', '+230 5252 5071'],
  email: 'info@primegroupltd.com',
  address: {
    line1: 'Apartment B4 Residence Cordegarde',
    line2: '29 Avenue Farquar',
    city: 'Quatre Bornes',
    country: 'Mauritius'
  },
  vision: 'To be the leading diversified business group in Mauritius, delivering excellence across multiple sectors and creating lasting value for our clients and communities.',
  mission: 'We provide professional, reliable, and innovative solutions across decoration, technical services, logistics, renewable energy, manufacturing, and healthcare distribution, serving businesses and communities throughout Mauritius with integrity and expertise.',
  values: [
    {
      title: 'Excellence',
      description: 'We deliver the highest quality in every service and product across all our companies.'
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical business practices in all our dealings.'
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and methods to provide cutting-edge solutions to our clients.'
    },
    {
      title: 'Reliability',
      description: 'Our clients trust us to deliver on our promises with consistent, dependable service.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices and renewable energy solutions.'
    }
  ]
}

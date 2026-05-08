export interface PortfolioProject {
  id: string
  slug: string
  title: string
  company: string
  category: string
  year: string
  image: string
  location: string
  duration: string
  shortDescription: string
  fullDescription: string
  services: string[]
  highlights: string[]
  result: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'luxury-office-interior-renovation',
    title: 'Luxury Office Interior Renovation',
    company: 'Prime Concept Decor',
    category: 'Interior',
    year: '2024',
    image: '/placeholders/concept-decor.svg',
    location: 'Port Louis, Mauritius',
    duration: '3 months',
    shortDescription: 'Complete interior transformation of a 5000 sq ft corporate office in Port Louis with modern design, custom carpentry and premium finishes',
    fullDescription: 'Prime Concept Decor delivered a comprehensive interior renovation for a prestigious corporate office in Port Louis. The project involved complete transformation of 5000 square feet of workspace, incorporating modern design principles, custom carpentry work, and premium finishing materials. Our team worked closely with the client to create a sophisticated environment that enhances productivity while reflecting the company\'s brand identity.',
    services: [
      'Space planning and interior design',
      'Custom carpentry and millwork',
      'Premium flooring installation',
      'Lighting design and installation',
      'Furniture procurement and setup',
      'Paint and finishing work'
    ],
    highlights: [
      'Modern open-plan workspace design',
      'Custom executive office suites',
      'Collaborative meeting spaces',
      'Premium materials throughout',
      'Energy-efficient lighting systems',
      'Completed on time and within budget'
    ],
    result: 'The project was completed successfully, transforming the office into a modern, functional workspace that exceeded client expectations. The new design improved employee satisfaction and productivity while creating a professional environment for client meetings.'
  },
  {
    id: '2',
    slug: 'commercial-hvac-installation',
    title: 'Commercial HVAC Installation Project',
    company: 'Prime Precision Cooling',
    category: 'HVAC',
    year: '2024',
    image: '/placeholders/precision-cooling.svg',
    location: 'Quatre Bornes, Mauritius',
    duration: '2 months',
    shortDescription: 'Full air conditioning system installation for a 3-story commercial building including electrical upgrades and maintenance contract',
    fullDescription: 'Prime Precision Cooling executed a complete HVAC installation for a modern 3-story commercial building in Quatre Bornes. The project included design, installation, and commissioning of a comprehensive air conditioning system, electrical infrastructure upgrades, and establishment of a long-term maintenance contract. Our team ensured optimal climate control while maximizing energy efficiency.',
    services: [
      'HVAC system design and engineering',
      'Commercial air conditioning installation',
      'Electrical system upgrades',
      'Ductwork installation',
      'System commissioning and testing',
      'Preventive maintenance contract'
    ],
    highlights: [
      'Energy-efficient VRV system',
      'Zone-based climate control',
      'Smart thermostat integration',
      'Backup power compatibility',
      '24/7 emergency support included',
      'Reduced energy costs by 30%'
    ],
    result: 'The installation was completed ahead of schedule with zero downtime for building operations. The new HVAC system provides superior climate control while reducing energy consumption by 30% compared to the previous system.'
  },
  {
    id: '3',
    slug: 'industrial-logistics-support',
    title: 'Industrial Logistics Support Contract',
    company: 'Prime Mechanical Equipment',
    category: 'Logistics',
    year: '2024',
    image: '/placeholders/mechanical-equipment.svg',
    location: 'Mauritius',
    duration: 'Ongoing',
    shortDescription: 'Ongoing transportation and logistics services for manufacturing facility, handling equipment and goods delivery across Mauritius',
    fullDescription: 'Prime Mechanical Equipment provides comprehensive logistics support for a major manufacturing facility in Mauritius. Our services include transportation of heavy equipment, raw materials delivery, finished goods distribution, and specialized handling of sensitive machinery. We maintain a fleet of specialized vehicles and trained personnel to ensure safe, timely deliveries across the island.',
    services: [
      'Heavy equipment transportation',
      'Raw materials delivery',
      'Finished goods distribution',
      'Specialized machinery handling',
      'Warehousing and storage',
      'Route optimization and tracking'
    ],
    highlights: [
      'Fleet of specialized transport vehicles',
      'Real-time GPS tracking',
      'Trained handling personnel',
      'Island-wide coverage',
      '99.8% on-time delivery rate',
      'Flexible scheduling options'
    ],
    result: 'Our ongoing partnership has resulted in improved supply chain efficiency, reduced transportation costs, and enhanced reliability for the client\'s operations. The manufacturing facility has experienced zero production delays due to logistics issues since partnering with us.'
  },
  {
    id: '4',
    slug: 'residential-solar-energy-installation',
    title: 'Residential Solar Energy Installation',
    company: 'Prime Green Technology',
    category: 'Renewable Energy',
    year: '2023',
    image: '/placeholders/green-technology.svg',
    location: 'Mauritius',
    duration: '6 weeks',
    shortDescription: 'Complete solar panel system installation for residential complex with battery storage and grid integration',
    fullDescription: 'Prime Green Technology designed and installed a comprehensive solar energy system for a residential complex, featuring high-efficiency solar panels, battery storage solutions, and seamless grid integration. The project enables the complex to generate clean energy, reduce electricity costs, and contribute to environmental sustainability while maintaining reliable power supply.',
    services: [
      'Solar energy system design',
      'High-efficiency panel installation',
      'Battery storage integration',
      'Grid-tie system setup',
      'Monitoring system installation',
      'Maintenance and support'
    ],
    highlights: [
      '50kW solar panel array',
      'Tesla Powerwall battery storage',
      'Smart energy management system',
      'Grid-tie with net metering',
      '70% reduction in electricity bills',
      '25-year performance warranty'
    ],
    result: 'The solar installation has reduced the complex\'s electricity costs by 70% while providing clean, renewable energy. Residents benefit from reliable power supply with battery backup during outages, and the system is projected to pay for itself within 6 years.'
  },
  {
    id: '5',
    slug: 'custom-blinds-installation',
    title: 'Custom Blinds Installation Project',
    company: 'Prime Blind',
    category: 'Blinds',
    year: '2024',
    image: '/placeholders/prime-blind.svg',
    location: 'Grand Baie, Mauritius',
    duration: '4 weeks',
    shortDescription: 'Design, manufacture and installation of custom blinds for 50-room boutique hotel in Grand Baie',
    fullDescription: 'Prime Blind delivered a complete window treatment solution for a luxury boutique hotel in Grand Baie. The project involved custom design, manufacturing, and installation of premium blinds for all 50 guest rooms, common areas, and administrative spaces. Our team ensured perfect fit, superior light control, and aesthetic harmony with the hotel\'s upscale interior design.',
    services: [
      'Custom blind design consultation',
      'Precision measurement and fitting',
      'In-house manufacturing',
      'Professional installation',
      'Motorized blind systems',
      'Maintenance and warranty support'
    ],
    highlights: [
      'Premium blackout blinds for guest rooms',
      'Motorized controls in suites',
      'UV-protective materials',
      'Custom colors matching hotel décor',
      'Sound insulation properties',
      'Easy maintenance design'
    ],
    result: 'The custom blind installation enhanced guest comfort and privacy while complementing the hotel\'s luxury aesthetic. Hotel management reported improved guest satisfaction scores and reduced energy costs due to better temperature control.'
  },
  {
    id: '6',
    slug: 'medical-supply-distribution',
    title: 'Medical Supply Distribution Project',
    company: 'Prime Health Care',
    category: 'Healthcare',
    year: '2023',
    image: '/placeholders/health-care.svg',
    location: 'Mauritius',
    duration: 'Ongoing',
    shortDescription: 'Established distribution network for medical equipment and supplies to 15 clinics and pharmacies across the island',
    fullDescription: 'Prime Health Care established a comprehensive distribution network serving 15 medical facilities across Mauritius. The project involved setting up reliable supply chains for medical equipment, pharmaceuticals, and healthcare supplies, ensuring timely delivery of critical items while maintaining strict quality and safety standards. Our temperature-controlled logistics and inventory management systems ensure product integrity.',
    services: [
      'Medical supply procurement',
      'Temperature-controlled storage',
      'Island-wide distribution',
      'Inventory management systems',
      'Emergency delivery services',
      'Regulatory compliance support'
    ],
    highlights: [
      'Network of 15 healthcare facilities',
      'Temperature-controlled transport',
      'Real-time inventory tracking',
      'Same-day emergency delivery',
      '100% regulatory compliance',
      'Quality assurance protocols'
    ],
    result: 'Our distribution network has improved medical supply availability across Mauritius, reduced stockout incidents by 95%, and ensured healthcare facilities have reliable access to essential equipment and supplies. The partnership has enhanced patient care capabilities across all served facilities.'
  }
]

export function getAllPortfolioProjects(): PortfolioProject[] {
  return portfolioProjects
}

export function getPortfolioProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find(project => project.id === id)
}

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find(project => project.slug === slug)
}

export function getRelatedProjects(currentProjectId: string, limit: number = 3): PortfolioProject[] {
  return portfolioProjects
    .filter(project => project.id !== currentProjectId)
    .slice(0, limit)
}

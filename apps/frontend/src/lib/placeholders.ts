export const placeholderMap: Record<string, string> = {
  // Sister Companies
  'concept-decor': '/placeholders/concept-decor.svg',
  'prime-concept-decor': '/placeholders/concept-decor.svg',
  'decoration': '/placeholders/concept-decor.svg',
  'interior': '/placeholders/concept-decor.svg',
  
  'precision-cooling': '/placeholders/precision-cooling.svg',
  'prime-precision-cooling': '/placeholders/precision-cooling.svg',
  'cooling': '/placeholders/precision-cooling.svg',
  'plumbing': '/placeholders/precision-cooling.svg',
  'electrical': '/placeholders/precision-cooling.svg',
  'hvac': '/placeholders/precision-cooling.svg',
  
  'mechanical-equipment': '/placeholders/mechanical-equipment.svg',
  'prime-mechanical-equipment': '/placeholders/mechanical-equipment.svg',
  'logistics': '/placeholders/mechanical-equipment.svg',
  'transport': '/placeholders/mechanical-equipment.svg',
  
  'green-technology': '/placeholders/green-technology.svg',
  'prime-green-technology': '/placeholders/green-technology.svg',
  'renewable': '/placeholders/green-technology.svg',
  'solar': '/placeholders/green-technology.svg',
  'energy': '/placeholders/green-technology.svg',
  
  'prime-blind': '/placeholders/prime-blind.svg',
  'blinds': '/placeholders/prime-blind.svg',
  'window': '/placeholders/prime-blind.svg',
  
  'health-care': '/placeholders/health-care.svg',
  'prime-health-care': '/placeholders/health-care.svg',
  'healthcare': '/placeholders/health-care.svg',
  'medical': '/placeholders/health-care.svg',
  
  // General
  'prime-group': '/placeholders/prime-group.svg',
  'corporate': '/placeholders/prime-group.svg',
  'default': '/placeholders/prime-group.svg',
  
  // Content Types
  'portfolio': '/placeholders/portfolio-default.svg',
  'project': '/placeholders/portfolio-default.svg',
  'blog': '/placeholders/blog-default.svg',
  'article': '/placeholders/blog-default.svg',
  'contact': '/placeholders/contact-default.svg',
}

export function getPlaceholder(category?: string): string {
  if (!category) return placeholderMap['default']
  
  const normalized = category.toLowerCase().replace(/\s+/g, '-')
  return placeholderMap[normalized] || placeholderMap['portfolio']
}

export function getCompanyPlaceholder(companySlug: string): string {
  const normalized = companySlug.toLowerCase()
  return placeholderMap[normalized] || placeholderMap['default']
}

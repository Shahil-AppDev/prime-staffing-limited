import { Building2, Target, Award, Users, CheckCircle } from 'lucide-react'
import { primeGroupInfo } from '@/lib/prime-group-data'

export const metadata = {
  title: 'About Prime Group Ltd | Diversified Business Group in Mauritius',
  description: 'Learn about Prime Group Ltd, a diversified Mauritian business group operating across decoration, cooling, mechanical services, renewable energy, blinds manufacturing and healthcare distribution.'
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About Prime Group Ltd
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              {primeGroupInfo.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                {primeGroupInfo.description}
              </p>
              <p>
                Based in Quatre Bornes, Mauritius, Prime Group Ltd brings together expertise across six specialized sectors, 
                each operating as an independent sister company with dedicated teams and resources. Our diversified approach 
                allows us to serve a wide range of industries while maintaining the highest standards of quality and professionalism 
                in each sector.
              </p>
              <p>
                From residential projects to large-scale commercial and industrial solutions, Prime Group Ltd delivers 
                comprehensive services backed by local expertise, modern equipment, and a commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {primeGroupInfo.vision}
              </p>
            </div>

            <div className="card p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {primeGroupInfo.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our business operations and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {primeGroupInfo.values.map((value, index) => (
              <div key={value.title} className="card p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Sectors */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Business Sectors
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Six specialized companies serving diverse industries across Mauritius
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              'Interior & Exterior Decoration',
              'Plumbing, Electrical & Air Conditioning',
              'Transportation & Logistics',
              'Renewable Energy Solutions',
              'Blinds Manufacturing & Installation',
              'Medical Goods Distribution'
            ].map((sector, index) => (
              <div key={sector} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="font-semibold">{sector}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mauritius Presence */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Proudly Serving Mauritius
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Prime Group Ltd is headquartered in Quatre Bornes and serves clients across Mauritius. 
              Our local presence, combined with our diverse expertise, makes us a trusted partner for 
              residential, commercial, and industrial projects throughout the island.
            </p>
            <div className="card p-8 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-2">Our Location</p>
                <p className="text-gray-900 font-medium">
                  {primeGroupInfo.address.line1}<br />
                  {primeGroupInfo.address.line2}<br />
                  {primeGroupInfo.address.city}, {primeGroupInfo.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Award, Heart, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              About <span className="gradient-text">Prime Staffing Ltd</span>
            </h1>
            <p className="text-xl text-gray-600">
              Connecting exceptional talent with outstanding opportunities since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015, Prime Staffing Ltd has been connecting exceptional talent with outstanding
                  opportunities for over 9 years. What started as a boutique recruitment agency has grown into a
                  comprehensive staffing solutions provider serving businesses across multiple industries.
                </p>
                <p>
                  Our leadership team brings over 20 years of combined experience in recruitment, talent acquisition,
                  and workforce management. Our vision was to create a staffing agency that combines cutting-edge
                  technology with personalized service, always putting both clients and candidates first.
                </p>
                <p>
                  Today, our team of dedicated recruiters works on placements ranging from temporary staffing
                  to executive search. We've successfully placed over 5,000 professionals and maintain a 95%
                  client satisfaction rate. Every placement receives the same level of care and attention.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-500">Image Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Talented professionals dedicated to bringing your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-2xl h-64 mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Photo</p>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const values = [
  {
    icon: <Heart className="h-8 w-8 text-primary-600" />,
    title: 'Passion',
    description: 'We love what we do and it shows in every project',
  },
  {
    icon: <Target className="h-8 w-8 text-primary-600" />,
    title: 'Excellence',
    description: 'Committed to delivering the highest quality results',
  },
  {
    icon: <Users className="h-8 w-8 text-primary-600" />,
    title: 'Collaboration',
    description: 'Working closely with clients to achieve their vision',
  },
  {
    icon: <Award className="h-8 w-8 text-primary-600" />,
    title: 'Innovation',
    description: 'Staying ahead with the latest design trends and technologies',
  },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: '15+ years of experience in recruitment and talent acquisition',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Executive Search',
    bio: 'Specializes in C-level and senior management placements',
  },
  {
    name: 'Emma Williams',
    role: 'Director of Operations',
    bio: 'Ensures seamless candidate experience and client satisfaction',
  },
]

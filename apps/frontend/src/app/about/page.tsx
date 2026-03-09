import { Users, Award, Heart, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              About Rajiv Interiors
            </h1>
            <p className="text-xl text-gray-600">
              Passionate about creating beautiful, functional spaces that inspire and delight
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
                  Founded in 2015, Rajiv Interiors has been transforming spaces and exceeding client 
                  expectations for over 8 years. What started as a passion project has grown into a 
                  full-service interior design firm serving residential and commercial clients.
                </p>
                <p>
                  Our founder, Rajiv Kumar, brings over 15 years of experience in interior design 
                  and architecture. His vision was to create a design firm that combines aesthetic 
                  excellence with practical functionality, always putting the client's needs first.
                </p>
                <p>
                  Today, our team of talented designers works on projects ranging from intimate 
                  residential renovations to large-scale commercial developments. Every project 
                  receives the same level of dedication and attention to detail.
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
    name: 'Rajiv Kumar',
    role: 'Founder & Lead Designer',
    bio: '15+ years of experience in interior design and architecture',
  },
  {
    name: 'Sophie Martin',
    role: 'Senior Designer',
    bio: 'Specializes in residential and hospitality design',
  },
  {
    name: 'Alex Thompson',
    role: 'Project Manager',
    bio: 'Ensures seamless execution from concept to completion',
  },
]

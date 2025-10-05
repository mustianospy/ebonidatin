import { SUBSCRIPTION_PRODUCTS } from '@/lib/products'

export default function MembershipPlansSection() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6">Membership Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-black/70 rounded-lg">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-yellow-600">Features</th>
                {SUBSCRIPTION_PRODUCTS.slice(0, 3).map(plan => (
                  <th key={plan.id} className="py-2 px-4 text-white">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                'Messaging',
                'Video calls',
                'Priority support',
                'Unlimited matches',
              ].map(feature => (
                <tr key={feature}>
                  <td className="py-2 px-4 text-white">{feature}</td>
                  {SUBSCRIPTION_PRODUCTS.slice(0, 3).map(plan => (
                    <td key={plan.id} className="py-2 px-4 text-center">
                      {plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase())) ? '✔️' : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-yellow-600 text-white font-bold px-8 py-3 rounded hover:bg-yellow-700 transition">
            Choose Your Plan
          </button>
        </div>
      </div>
    </section>
  )
}
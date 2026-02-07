function Testimonials() {
  try {
    const testimonials = [
      { name: 'Sarah Johnson', role: 'Homeowner', text: 'STRUCTIFORM transformed our living room into a stunning space that perfectly matches our lifestyle.', rating: 5 },
      { name: 'Michael Chen', role: 'Business Owner', text: 'Their office design exceeded our expectations. Professional, creative, and delivered on time.', rating: 5 },
      { name: 'Emma Williams', role: 'Property Developer', text: 'Outstanding renovation work. The attention to detail is remarkable.', rating: 5 }
    ];

    return (
      <section className="py-16 bg-white" data-name="testimonials" data-file="components/Testimonials.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Client Stories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="icon-star text-lg text-[var(--primary-color)]"></div>
                  ))}
                </div>
                <p className="text-[var(--secondary-color)] mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mr-3">
                    <div className="icon-user text-lg text-white"></div>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-[var(--secondary-color)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Testimonials component error:', error);
    return null;
  }
}
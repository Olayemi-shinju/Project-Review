import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';

const contactDetails = {
  phone: '+234 XXX XXX XXXX',
  email: 'info@yourcompany.com',
  address: 'Add company office address',
  whatsapp: '234XXXXXXXXXX',
};

function Contact() {
  return (
    <>
      <Navbar />

      <main>

        <section className="bg-[#F5F7FA] py-20 sm:py-24">
          <div className="container">
            <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-4">
              Contact Us
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102B46] tracking-tight">
              Let's Talk About Your Energy Needs.
            </h1>

            <p className="text-slate-500 leading-8 mt-5 max-w-2xl">
              Interested in our work or looking for a solar energy
              solution? Reach out to our team directly.
            </p>
          </div>
        </section>


        <section className="section-padding bg-white">
          <div className="container">

            <div className="max-w-2xl mb-12">
              <h2 className="section-title">
                Get in Touch
              </h2>

              <p className="section-description mt-4">
                You can contact us through any of the channels below.
                Our team will be happy to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

   
              <a
                href={`tel:${contactDetails.phone.replaceAll(' ', '')}`}
                className="group border border-slate-100 rounded-xl p-7 hover:border-slate-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <Phone size={23} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-6">
                  Phone
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {contactDetails.phone}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] mt-5 group-hover:text-[#D99A08]">
                  Call Us
                  <ArrowUpRight size={16} />
                </span>
              </a>


              <a
                href={`mailto:${contactDetails.email}`}
                className="group border border-slate-100 rounded-xl p-7 hover:border-slate-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <Mail size={23} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-6">
                  Email
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {contactDetails.email}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] mt-5 group-hover:text-[#D99A08]">
                  Send an Email
                  <ArrowUpRight size={16} />
                </span>
              </a>

              <a
                href={`https://wa.me/${contactDetails.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-slate-100 rounded-xl p-7 hover:border-slate-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <MessageCircle size={23} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-6">
                  WhatsApp
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Chat with our team directly.
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] mt-5 group-hover:text-[#D99A08]">
                  Chat on WhatsApp
                  <ArrowUpRight size={16} />
                </span>
              </a>

        
              <div className="border border-slate-100 rounded-xl p-7">
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <MapPin size={23} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-6">
                  Office Address
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {contactDetails.address}
                </p>
              </div>

            </div>
          </div>
        </section>


        <section className="bg-[#F5F7FA] py-16">
          <div className="container text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102B46]">
              Ready to Explore Solar Solutions?
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              Contact us directly and let's discuss your energy needs.
            </p>

            <a
              href={`https://wa.me/${contactDetails.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button mt-7"
            >
              Chat With Us
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;

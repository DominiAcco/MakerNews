import { Mail, Phone, MapPin, Clock, Users, Store, Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
  const contactInfo = {
    emails: ["dominiacco@gmail.com", "smokeyallenn@gmail.com"],
    phones: [
      { number: "(11) 99999-9999", whatsapp: true },
      { number: "(11) 88888-8888", whatsapp: false }
    ],
    address: "R. Walter Hubacher, 138 - Vila Beatriz, Nova Andradina - MS, 79750-000",
    hours: {
      weekdays: "Segunda a Sexta: 8h às 18h",
      saturday: "Sábado: 9h às 13h"
    }
  };

  const handlePhoneClick = (phoneNumber: string, isWhatsapp: boolean) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (isWhatsapp) {
      window.open(`https://wa.me/55${cleanNumber}?text=Olá! Gostaria de entrar em contato com o MakerNews.`, '_blank');
    } else {
      window.open(`tel:${cleanNumber}`, '_blank');
    }
  };

  const handleEmailClick = (email: string) => {
    const subject = encodeURIComponent('Contato MakerNews');
    const body = encodeURIComponent('Olá, gostaria de entrar em contato com o MakerNews.');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
  };

  const handleAddressClick = () => {
    const encodedAddress = encodeURIComponent(contactInfo.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleStoreClick = () => {
    window.open('https://ecommerce-impressora3-d.vercel.app/', '_blank');
  };

  const IconWrapper = ({ children, color = "#5421CD" }: { children: React.ReactNode, color?: string }) => (
    <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
      <div style={{ color }} className="flex items-center justify-center">
        {children}
      </div>
    </div>
  );

  return (
    <section id="contato" className="mt-15 md:mt-30 flex justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-[#5421CD]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em <span className="text-[#5421CD]">Contato</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tem dúvidas, sugestões ou quer colaborar com o nosso espaço? 
            Estamos sempre abertos a novas ideias e parcerias.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="lg:w-1/2">
            <div className="h-full bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#5421CD] rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Informações
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">

                <div className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#5421CD] transition-all duration-300">
                  <IconWrapper color="#5421CD">
                    <Mail className="w-5 h-5" />
                  </IconWrapper>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                    <div className="space-y-2">
                      {contactInfo.emails.map((email, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmailClick(email)}
                          className="group/item flex items-center justify-between w-full text-left hover:text-[#5421CD] transition-colors"
                        >
                          <span className="text-gray-700 group-hover/item:text-[#5421CD]">{email}</span>
                          <span className="text-xs text-gray-500 group-hover/item:text-[#5421CD]">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-500 transition-all duration-300">
                  <IconWrapper color="#10B981">
                    <Phone className="w-5 h-5" />
                  </IconWrapper>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Telefone</h4>
                    <div className="space-y-2">
                      {contactInfo.phones.map((phone, index) => (
                        <button
                          key={index}
                          onClick={() => handlePhoneClick(phone.number, phone.whatsapp)}
                          className="group/item flex items-center justify-between w-full text-left hover:text-green-600 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 group-hover/item:text-green-600">{phone.number}</span>
                            {phone.whatsapp && (
                              <span className="text-xs text-green-500">(WhatsApp)</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 group-hover/item:text-green-600">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-all duration-300">
                  <IconWrapper color="#EF4444">
                    <MapPin className="w-5 h-5" />
                  </IconWrapper>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Localização</h4>
                    <button
                      onClick={handleAddressClick}
                      className="group/item flex items-center justify-between w-full text-left hover:text-red-600 transition-colors"
                    >
                      <span className="text-gray-700 group-hover/item:text-red-600 line-clamp-2">
                        {contactInfo.address}
                      </span>
                      <span className="text-xs text-gray-500 group-hover/item:text-red-600">→</span>
                    </button>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-amber-500 transition-all duration-300">
                  <IconWrapper color="#F59E0B">
                    <Clock className="w-5 h-5" />
                  </IconWrapper>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Horário</h4>
                    <div className="space-y-1">
                      <p className="text-gray-700">{contactInfo.hours.weekdays}</p>
                      <p className="text-gray-700">{contactInfo.hours.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">Agendamento de Visitas:</strong> Para agendar uma visita ao nosso 
                  espaço ou marcar uma reunião, entre em contato pelo telefone ou email.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="h-full bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#5421CD] rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Loja & Comunidade
                </h3>
              </div>
              
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3">
                    Conheça Nossa Loja
                  </h4>
                  <p className="text-gray-600">
                    Visite a loja oficial do MakerNews para adquirir produtos e fazer orçamentos .
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="group p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <IconWrapper color="#F97316">
                        <Store className="w-5 h-5" />
                      </IconWrapper>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">Loja Oficial</h5>
                        <p className="text-sm text-gray-600">
                          Compre produtos, componentes e kits exclusivos do MakerNews
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleStoreClick}
                      className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors font-medium text-sm hover:shadow-sm"
                    >
                      Visitar Loja Oficial
                    </button>
                  </div>

                  <div className="group p-4 rounded-lg border border-gray-200 hover:border-pink-500 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <IconWrapper color="#EC4899">
                        <Instagram className="w-5 h-5" />
                      </IconWrapper>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">Instagram</h5>
                        <p className="text-sm text-gray-600">
                          Siga-nos para ver projetos e novidades
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open('https://instagram.com', '_blank')}
                      className="w-full py-2.5 px-4 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors font-medium text-sm hover:shadow-sm"
                    >
                      Seguir no Instagram
                    </button>
                  </div>

                  <div className="group p-4 rounded-lg border border-gray-200 hover:border-red-500 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <IconWrapper color="#EF4444">
                        <Youtube className="w-5 h-5" />
                      </IconWrapper>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">YouTube</h5>
                        <p className="text-sm text-gray-600">
                          Assista aos tutoriais e projetos em vídeo
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open('https://youtube.com', '_blank')}
                      className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors font-medium text-sm hover:shadow-sm"
                    >
                      Inscrever-se no YouTube
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
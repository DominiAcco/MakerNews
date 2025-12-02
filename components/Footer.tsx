// components/Footer.tsx
import React from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  ChevronRight,
  Heart,
  Zap
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0e0e0e] to-[#111111] text-gray-300 pt-20 pb-10 mt-32">
      <div className="w-[90%] md:w-[80%] mx-auto">
        
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-gray-800/50">
          
          {/* LOGO & DESCRIPTION */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5421CD] to-[#7C5CFF] blur-lg opacity-30 rounded-full"></div>
                <Sparkles className="w-10 h-10 text-[#D6C7FF] relative z-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  MAKER<span className="text-[#5421CD]">LAB</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">Inovação & Tecnologia</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 pr-4">
              Um espaço colaborativo onde criatividade e tecnologia se encontram. 
              Transformamos ideias em projetos reais através de infraestrutura completa 
              e comunidade ativa.
            </p>
            
            {/* SOCIAL LINKS */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
                { icon: Linkedin, label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 
                           hover:bg-gradient-to-br hover:from-[#5421CD]/20 hover:to-transparent 
                           hover:text-white hover:border hover:border-[#5421CD]/30 
                           transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS ÚTEIS */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-[#5421CD]" />
              Links Úteis
            </h3>
            <ul className="space-y-4">
              {[
                'Sobre o Lab',
                'Projetos',
                'Recursos',
                'Equipamentos',
                'Eventos',
                'Galeria',
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#D6C7FF] transition-colors duration-300 
                             flex items-center gap-2 group text-sm"
                  >
                    <div className="w-1 h-1 bg-[#5421CD] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTATO */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5421CD]" />
                  Contato
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-[#5421CD]/10 to-transparent 
                                  border border-[#5421CD]/20 mt-1 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#D6C7FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">E-mail</p>
                      <a href="mailto:contato@labmaker.com.br" 
                        className="text-white hover:text-[#D6C7FF] transition-colors text-sm">
                       contato@uems.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-[#5421CD]/10 to-transparent 
                                  border border-[#5421CD]/20 mt-1 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#D6C7FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Telefone</p>
                      <p className="text-white text-sm">(67) 3925-5184</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5421CD]" />
                  Localização
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-[#5421CD]/10 to-transparent 
                                  border border-[#5421CD]/20 mt-1 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D6C7FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Endereço</p>
                      <p className="text-white text-sm leading-relaxed">
                        R. Walter Hubacher, 138 - Vila Beatriz,<br />
                        Nova Andradina - MS<br />
                        79750-000, Brazil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-[#5421CD]/10 to-transparent 
                                  border border-[#5421CD]/20 mt-1 flex-shrink-0">
                      <Zap className="w-5 h-5 text-[#D6C7FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Horário de Atendimento</p>
                      <p className="text-white text-sm">
                        Segunda a Sexta<br />
                        9:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} <span className="text-white font-medium">MAKERLAB</span>. 
              <span className="mx-2">•</span>
              Todos os direitos reservados.
              <span className="ml-4 flex items-center gap-1 text-gray-600">
                <Heart className="w-3 h-3 text-[#5421CD]" />
                Desenvolvido para inovação
              </span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Acessibilidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
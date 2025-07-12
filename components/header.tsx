"use client"

import React, { useState, useEffect, useRef } from "react"
import { Menu, X, Home, RefreshCw, Archive, Wrench, ChevronRight, Crown, Music, Video, PackageSearch, User } from "lucide-react"

// --- IMPORTAÇÕES DO CLERK ---
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Componente para importar a fonte do Google Fonts
const GoogleFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    body, button, input, select, textarea {
      font-family: 'Roboto', sans-serif;
    }
    .font-menu {
      font-family: 'Roboto', sans-serif;
    }
    /* Animação para o dropdown */
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-down {
      animation: fadeInDown 0.2s ease-out forwards;
    }
  `}</style>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileAcervosOpen, setIsMobileAcervosOpen] = useState(false)
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false)
  const [isMobileClienteOpen, setIsMobileClienteOpen] = useState(false)
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
  const [pathname, setPathname] = useState("")
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDesktopSubmenu(null) // Fecha submenu ao navegar
  }, [pathname])

  useEffect(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        return () => {
          document.body.style.overflow = "auto"
        }
    }
  }, [isMenuOpen])
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDesktopSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef]);


  const menuItems = [
    { id: 'home', href: "/", label: "HOME", icon: <Home size={14} /> },
    { id: 'updates', href: "/atualizacoes", label: "PACKS", icon: <RefreshCw size={14} /> },
    {
      id: 'acervos',
      label: "ACERVOS",
      icon: <Archive size={14} />,
      submenu: [
        { href: "/acervos/acervos2023", label: "ACERVO 2023" },
      ],
    },
    { id: 'deemix', href: "/deemix", label: "DEEMIX", icon: <Music size={14} /> },
    { id: 'allavsoft', href: "/allavsoft", label: "ALLAVSOFT", icon: <Video size={14} /> },
    {
      id: 'tools',
      label: "FERRAMENTAS",
      icon: <Wrench size={14} />,
      submenu: [
        { href: "/converter-letras", label: "CONVERTER LETRAS" },
        { href: "/programas-uteis", label: "PROGRAMAS ÚTEIS" },
      ],
    },
    {
      id: 'cliente',
      label: 'CLIENTE',
      icon: <User size={14} />,
      submenu: [
        { href: 'https://djjessica.vercel.app/downloads', label: 'GERENCIAR PEDIDOS', icon: <PackageSearch size={14} /> },
        { href: 'https://djjessica.vercel.app/meu-cadastro', label: 'ÁREA VIP', icon: <Crown size={14} /> }
      ]
    }
  ];

  const renderMenuItem = (item: any, isDesktop = false) => (
    <div key={item.id} className="relative">
      {item.submenu ? (
        <div>
          <button
            onClick={() => setOpenDesktopSubmenu(openDesktopSubmenu === item.id ? null : item.id)}
            className={`w-full flex items-center gap-1.5 transition-colors duration-200 ${isDesktop ? 'px-3 py-2 rounded-full text-sm font-semibold text-gray-300 hover:bg-gray-700/50 hover:text-white' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${openDesktopSubmenu === item.id ? 'rotate-90' : ''}`} />
          </button>
          {openDesktopSubmenu === item.id && isDesktop && (
            <div className="absolute top-full right-0 mt-2 bg-[#1c1f1d] border border-green-600/30 rounded-md shadow-lg z-50 min-w-[220px] animate-fade-in-down">
              {item.submenu.map((subitem: any) => (
                <a
                  key={subitem.href}
                  href={subitem.href}
                  target={subitem.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-green-600/20 hover:text-white transition-colors flex items-center gap-2"
                  onClick={() => setOpenDesktopSubmenu(null)}
                >
                  {subitem.icon}
                  {subitem.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <a
          href={item.href}
          className={`flex items-center gap-1.5 transition-colors duration-200 ${isDesktop ? `px-3 py-2 rounded-full text-sm font-semibold  ${pathname === item.href ? 'bg-green-500/20 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}` : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      )}
    </div>
  );


  return (
    <>
      <GoogleFont />
      <header ref={headerRef} className="bg-[#0F1110] shadow-lg z-50 font-menu">
        <div className="max-w-7xl mx-auto px-4">
          {/* --- Desktop Header --- */}
          <div className="hidden md:flex items-center justify-between h-20">
            <a href="/" aria-label="Página Inicial" className="flex-shrink-0">
              <img
                src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png"
                alt="N3XOR RECORDS Logo"
                className="h-10 w-auto"
              />
            </a>
            <nav className="flex items-center space-x-2">
              {menuItems.map(item => renderMenuItem(item, true))}
              
              {/* --- INÍCIO: Bloco de Autenticação Desktop --- */}
              <div className="pl-4 ml-4 border-l border-gray-700">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                   <SignInButton mode="modal">
                     <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                       Login
                     </button>
                   </SignInButton>
                </SignedOut>
              </div>
              {/* --- FIM: Bloco de Autenticação Desktop --- */}
            </nav>
          </div>

          {/* --- Mobile Header --- */}
          <div className="md:hidden flex items-center justify-between h-16">
            <a href="/" aria-label="Página Inicial">
              <img
                src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png"
                alt="N3XOR RECORDS Logo"
                className="h-9 w-auto"
              />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-green-600/20 transition-colors"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-[#0F1110] shadow-lg z-50 transition-transform duration-300 transform ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-green-600/30">
                <span className="text-lg font-bold text-white">MENU</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white p-2 rounded-md hover:bg-green-600/20 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col p-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="mb-2">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => {
                            if (item.id === "acervos") setIsMobileAcervosOpen(!isMobileAcervosOpen);
                            if (item.id === "tools") setIsMobileToolsOpen(!isMobileToolsOpen);
                            if (item.id === "cliente") setIsMobileClienteOpen(!isMobileClienteOpen);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-md ${(
                            (item.id === "acervos" && isMobileAcervosOpen) || (item.id === "tools" && isMobileToolsOpen) || (item.id === 'cliente' && isMobileClienteOpen)
                          ) ? "bg-green-600/20 text-white" : "text-gray-300 hover:bg-green-600/10 hover:text-white"} transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-md ${(item.id === "acervos" && isMobileAcervosOpen) || (item.id === "tools" && isMobileToolsOpen) || (item.id === 'cliente' && isMobileClienteOpen) ? "bg-green-600" : "bg-green-600/20"}`}>
                              {item.icon}
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${(item.id === "acervos" && isMobileAcervosOpen) || (item.id === "tools" && isMobileToolsOpen) || (item.id === 'cliente' && isMobileClienteOpen) ? "rotate-90" : ""}`} />
                        </button>
                        {((item.id === "acervos" && isMobileAcervosOpen) || (item.id === "tools" && isMobileToolsOpen) || (item.id === 'cliente' && isMobileClienteOpen)) && (
                          <div className="ml-10 mt-1 border-l-2 border-green-600/30 pl-4 space-y-2 py-2">
                            {item.submenu.map((subitem: any) => (
                              <a
                                key={subitem.href}
                                href={subitem.href}
                                target={subitem.href.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className={`block p-2 rounded-md ${
                                  pathname === subitem.href
                                    ? "bg-green-600/20 text-white"
                                    : "text-gray-300 hover:bg-green-600/10 hover:text-white"
                                } transition-colors flex items-center gap-2`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subitem.icon}
                                {subitem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className={`flex items-center gap-3 p-3 rounded-md ${
                          pathname === item.href
                            ? "bg-green-600/20 text-white"
                            : "text-gray-300 hover:bg-green-600/10 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={`p-1.5 rounded-md ${pathname === item.href ? "bg-green-600" : "bg-green-600/20"}`}>
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </a>
                    )}
                  </div>
                ))}

                {/* --- INÍCIO: Bloco de Autenticação Mobile --- */}
                <div className="mt-6 pt-4 border-t border-green-600/30">
                    <SignedIn>
                        <div className="flex items-center gap-3 p-3">
                            <UserButton afterSignOutUrl="/" />
                            <span className="text-white font-semibold">Meu Perfil e Sair</span>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="w-full flex items-center justify-center gap-3 p-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                <User size={16} />
                                <span>Fazer Login / Cadastrar</span>
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
                {/* --- FIM: Bloco de Autenticação Mobile --- */}

              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  RefreshCw,
  Archive,
  Wrench,
  ChevronRight,
  Crown,
  Music,
  Video,
  PackageSearch,
  User,
} from "lucide-react";

// Fonte
const GoogleFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    body, button, input, select, textarea {
      font-family: 'Roboto', sans-serif;
    }
    .font-menu {
      font-family: 'Roboto', sans-serif;
    }
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileAcervosOpen, setIsMobileAcervosOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isMobileClienteOpen, setIsMobileClienteOpen] = useState(false);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState(null);
  const [pathname, setPathname] = useState("");
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDesktopSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDesktopSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef]);

  const menuItems = [
    { id: "home", href: "/", label: "HOME", icon: <Home size={14} /> },
    { id: "updates", href: "/atualizacoes", label: "PACKS", icon: <RefreshCw size={14} /> },
    {
      id: "acervos",
      href: "#",
      label: "ACERVOS",
      icon: <Archive size={14} />,
      submenu: [{ href: "/acervos/acervos2023", label: "ACERVO 2023" }],
    },
    { id: "deemix", href: "/deemix", label: "DEEMIX", icon: <Music size={14} /> },
    { id: "allavsoft", href: "/allavsoft", label: "ALLAVSOFT", icon: <Video size={14} /> },
    {
      id: "tools",
      href: "#",
      label: "FERRAMENTAS",
      icon: <Wrench size={14} />,
      submenu: [
        { href: "/converter-letras", label: "CONVERTER LETRAS" },
        { href: "/programas-uteis", label: "PROGRAMAS ÚTEIS" },
      ],
    },
    {
      id: "cliente",
      href: "#",
      label: "CLIENTE",
      icon: <User size={14} />,
      submenu: [
        {
          href: "https://djjessica.vercel.app/downloads",
          label: "GERENCIAR PEDIDOS",
          icon: <PackageSearch size={14} />,
        },
        { href: "https://djjessica.vercel.app/meu-cadastro", label: "ÁREA VIP", icon: <Crown size={14} /> },
      ],
    },
  ];

  const renderMenuItem = (item, isDesktop = false) => (
    <div key={item.id} className="relative">
      {item.submenu ? (
        <div>
          <button
            onClick={() => setOpenDesktopSubmenu(openDesktopSubmenu === item.id ? null : item.id)}
            className={`w-full flex items-center gap-1.5 transition-colors duration-200 ${
              isDesktop ? "px-3 py-2 rounded-full text-sm font-semibold text-gray-300 hover:bg-gray-700/50 hover:text-white" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                openDesktopSubmenu === item.id ? "rotate-90" : ""
              }`}
            />
          </button>
          {openDesktopSubmenu === item.id && isDesktop && (
            <div className="absolute top-full right-0 mt-2 bg-[#1c1f1d] border border-green-600/30 rounded-md shadow-lg z-50 min-w-[220px] animate-fade-in-down">
              {item.submenu.map((subitem) => (
                <a
                  key={subitem.href}
                  href={subitem.href}
                  target={subitem.href.startsWith("http") ? "_blank" : "_self"}
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
          className={`flex items-center gap-1.5 transition-colors duration-200 ${
            isDesktop
              ? `px-3 py-2 rounded-full text-sm font-semibold ${
                  pathname === item.href
                    ? "bg-green-500/20 text-white"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`
              : ""
          }`}
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
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-20">
            <a href="/" aria-label="Página Inicial" className="flex-shrink-0">
              <img
                src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png"
                alt="N3XOR RECORDS Logo"
                className="h-10 w-auto"
              />
            </a>
            <nav className="flex items-center space-x-2">
              {menuItems.map((item) => renderMenuItem(item, true))}
            </nav>
          </div>

          {/* Mobile Header */}
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
      </header>
    </>
  );
};

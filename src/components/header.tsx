import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Menu } from '@headlessui/react';
import Image from "next/image";
import Link from "next/link";

export function Header() {
  // Estado para controle do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hook para verificar se a tela é um dispositivo móvel
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="bg-primary-blue text-text bold text-sm flex py-4 px-8 justify-between items-center sticky top-0 z-20">
      <Link href="/">
        {/* <Image src='/icon.png' alt="Icon da letra B, logo da Banca" width={124} height={124} /> */}
        <h4 className='text-lg text-text font-bold'>@logomarca</h4>
      </Link>

      {/* Menu para dispositivos móveis */}
      {isMobile && (
        <Menu as="div" className="relative inline-block">
          <Menu.Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Ícone do menu hamburger */}
            <div className="space-y-2">
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
            </div>
          </Menu.Button>
          {isMenuOpen && (
            <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/games">
                    <div className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm`}>
                      <Link href="/games">
                        Jogos do dia
                      </Link>
                    </div>
                    <div className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm`}>
                      <Link href="/historic">
                        Apostas
                      </Link>
                    </div>
                    <div className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm`}>
                      <Link href="/ranking">
                        Ranking
                      </Link>
                    </div>
                    <div className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm`}>
                      <Link href="/">
                        Login
                      </Link>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          )}

        </Menu>
      )}

      {!isMobile && (
        <nav className="md:flex items-center gap-4 text-md">
          <Link className='text-sm font-bold text-text' href="/games">Jogos do dia</Link>
          <Link className='text-sm font-bold text-text' href="/historic">Apostas</Link>
          <Link className='text-sm font-bold text-text' href="/ranking">Ranking</Link>
          <Link className='text-sm font-bold bg-white rounded-md px-2 py-1 text-text' href="/">Login</Link>
        </nav>
      )}
    </div>
  )
}

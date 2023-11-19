import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Menu } from '@headlessui/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import logo from './../../public/icon.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        router.push('/auth/signin');
      } else {
        console.error('Falha ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };


  return (
    <div className="bg-primary-blue text-text bold text-sm flex py-4 px-8 justify-between items-center sticky top-0 z-20">
      <Link className="flex items-center font-bold" href="/">
        <Image
          src={logo}
          alt="logo"
          width={32}
          height={32}
          className="w-8 h-8 mr-2"
        />
      </Link>

      {isMobile && (
        <Menu as="div" className="relative inline-block">
          <Menu.Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                        Jogos do dia 171F23 45C6B7
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
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          )}

        </Menu>
      )}

      {!isMobile && (
        <nav className="md:flex items-center gap-4 text-md">
          <Link className='text-sm text-text' href="/games">Jogos do dia</Link>
          <Link className='text-sm text-text' href="/historic">Apostas</Link>
          <Link className='text-sm text-text' href="/ranking">Ranking</Link>
          <button className='text-sm font-bold bg-white rounded-md px-2 text-text' onClick={logout}>Sair</button>
        </nav>
      )}
    </div>
  )
}

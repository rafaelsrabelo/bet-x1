import { Header } from "@/components/header";
import Image from "next/image";
import bannerImage from "./../../public/banner.jpg";
import defaultTeamLogo from "./../../public/emblema.png";
import { useState } from "react";

interface Odd {
  type: string;
  value: string;
  match: string;
}

export default function Games() {
  const headerAndPaddingHeight = 64 + 16 * 4;
  const bannerAndTitleHeight = 140 + (16 * 2);

  const [selectedOdds, setSelectedOdds] = useState<Odd[]>([]);
  const [betCart, setBetCart] = useState<Odd[]>([]);

  function handleSelectOdd(odd: Odd) {
    const isAlreadySelected = selectedOdds.some(selected => selected.type === odd.type && selected.value === odd.value);
    if (isAlreadySelected) {
      setSelectedOdds([]);
      setBetCart([]);
    } else {
      setSelectedOdds([odd]);
      setBetCart([odd]);
    }
  };


  const odds = [
    { type: 'Casa', value: '2.25', match: 'Jogador Banca 1 x Jogador Banca 2' },
    { type: 'Empate', value: '4.00', match: 'Jogador Banca 1 x Jogador Banca 2' },
    { type: 'Fora', value: '3.00', match: 'Jogador Banca 1 x Jogador Banca 2' },
  ];

  return (
    <>
      <Header />
      <div className="px-8 my-4">
        <h1 className="font-bold text-sm my-2">
          Jogos do dia {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </h1>
        <div className="grid md:grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="relative bg-primary border border-primary-blue rounded-md" style={{ height: '140px' }}>
              <Image
                src={bannerImage}
                alt="Banner"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="bg-primary border border-primary-blue rounded-md overflow-y-auto mt-8 p-4"
              style={{ height: `calc(100vh - ${bannerAndTitleHeight}px - ${headerAndPaddingHeight}px)` }}>
              <h4 className="font-bold text-lg text-white  mb-2">
                X1 BRAZIL
              </h4>
              <div className="flex justify-center items-center bg-primary-gray p-4 rounded-md mb-2">
                <div>
                  <span className="text-xs">{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <div className="flex justify-start items-center">
                    <Image
                      alt="Time casa"
                      src={defaultTeamLogo}
                      width={24}
                      height={24}
                    />
                    <p className="font-bold text-xs ml-2">Jogador Banca 1</p>
                  </div>
                  <div className="flex justify-start items-center">
                    <Image
                      alt="Time Fora"
                      src={defaultTeamLogo}
                      width={24}
                      height={24}
                    />
                    <p className="font-bold text-xs ml-2">Jogador Banca 2</p>
                  </div>
                </div>
                <div className="ml-auto grid grid-cols-3 gap-2">
                  {odds.map((odd, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${selectedOdds.some(
                        (selected) =>
                          selected.type === odd.type &&
                          selected.value === odd.value
                      )
                        ? "bg-primary-blue text-text"
                        : "bg-secondary-gray"
                        }`}
                      onClick={() => handleSelectOdd(odd)}
                    >
                      <p className="text-sm">{odd.type}</p>
                      <p className="font-bold text-sm">{odd.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 mb-2">
            <div className="flex flex-col bg-primary border border-primary-blue rounded-md"
              style={{ height: `calc(100vh - ${headerAndPaddingHeight}px)` }}>
              <div className="p-4 border-primary-blue">
                <h2 className="text-lg font-bold">Carrinho de apostas ({betCart.length})</h2>
              </div>
              <div className="flex-grow overflow-y-auto px-4 ">
                {betCart.map((bet, index) => (
                  <div key={index} className="flex flex-col border-b mb-2 pb-2">
                    <div className="rounded-t-md bg-secondary-gray">
                      <span className="font-bold text-xs px-2">{bet.match}</span>
                    </div>
                    <div className="flex justify-between items-center bg-primary-gray rounded-b-md p-2">
                      <div className="">
                        <p className="font-bold text-xs">{bet.type}</p>
                        <p className="text-xs">Resultado Final</p>
                      </div>
                      <p className="font-bold text-xs text-primary-blue">{bet.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-2">
                <input
                  type="number"
                  placeholder="R$ Valor da aposta"
                  className="w-full h-8 text-xs py-2 px-3 rounded-md border border-gray-300 text-text"
                />
              </div>
              <div className="flex px-4">
                <p className="text-xs">Total de odds:</p>
                <p className="ml-auto text-primary-blue">0.00</p>
              </div>
              <div className="px-4 pb-4 pt-2 mt-auto">
                <button className="w-full h-8 text-xs bg-primary-blue text-white font-bold py-2 rounded-md hover">
                  Confirmar aposta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

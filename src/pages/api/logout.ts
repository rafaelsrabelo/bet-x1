// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Tentando fazer logout...'); // Adicione isso para diagnóstico
  // Sobrescreve o cookie existente, definindo a data de expiração para o passado
  nookies.set({ res }, 'token', '', {
    maxAge: -1, // Data no passado para expirar o cookie
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Apenas em produção
    sameSite: 'lax',
  });

  res.status(200).end(); // Termina a resposta com status 200
}

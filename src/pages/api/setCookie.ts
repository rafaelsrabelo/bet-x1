// pages/api/setCookie.ts
import { NextApiRequest, NextApiResponse } from 'next';

type SetCookieRequestBody = {
  token: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body as SetCookieRequestBody;
    res.setHeader('Set-Cookie', `token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);
    res.status(200).json({ message: 'Cookie configurado' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }}

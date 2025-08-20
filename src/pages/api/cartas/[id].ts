import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const ALLOWED = ['ativa', 'reservada', 'vendida'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === 'PATCH' || req.method === 'PUT') {
    try {
      const { status } = req.body ?? {};
      if (!status || !ALLOWED.includes(String(status).toLowerCase())) {
        return res.status(400).json({ error: 'Status inválido. Use: ativa, reservada, vendida.' });
      }

      const updated = await prisma.carta.update({
        where: { id },
        data: { status: String(status).toLowerCase() },
      });

      return res.status(200).json(updated);
    } catch (e: any) {
      console.error('PATCH /api/cartas/[id] error:', e);
      return res.status(500).json({ error: 'Erro ao atualizar status.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.carta.delete({ where: { id } });
      return res.status(204).end();
    } catch (e: any) {
      console.error('DELETE /api/cartas/[id] error:', e);
      return res.status(500).json({ error: 'Erro ao remover carta.' });
    }
  }

  res.setHeader('Allow', ['PATCH', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

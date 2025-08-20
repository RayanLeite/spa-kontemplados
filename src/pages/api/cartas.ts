import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const cartas = await prisma.carta.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(cartas);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      return res.status(500).json({ error: 'Erro ao buscar cartas.' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        idCarta,
        tipo,
        administradora,
        valorCredito,
        valorEntrada,
        parcelas,
        valorParcela,
        vencimento,
        comissao,
        status, // opcional
      } = req.body ?? {};

      // Validações (sem barrar valores zero)
      if (!idCarta || !tipo || !administradora || vencimento === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando (idCarta, tipo, administradora, vencimento).' });
      }

      const num = (v: any) => Number(v);
      const vc = num(valorCredito);
      const ve = num(valorEntrada ?? 0);
      const np = num(parcelas);
      const vp = num(valorParcela);
      const cm = num(comissao);

      if ([vc, ve, np, vp, cm].some((n) => Number.isNaN(n))) {
        return res.status(400).json({ error: 'Valores numéricos inválidos.' });
      }

      // Converte data
      const toDate = (d: any) =>
        typeof d === 'string' ? new Date(`${d}T00:00:00`) : new Date(d);
      const due = toDate(vencimento);
      if (Number.isNaN(due.getTime())) {
        return res.status(400).json({ error: 'Vencimento inválido (use o formato YYYY-MM-DD).' });
      }

      const created = await prisma.carta.create({
        data: {
          idCarta: String(idCarta).trim(),
          tipo: String(tipo),
          administradora: String(administradora),
          valorCredito: vc,
          valorEntrada: ve,
          parcelas: np,
          valorParcela: vp,
          vencimento: due,
          comissao: cm,
          status: status ? String(status) : 'Ativa',
        },
      });

      return res.status(201).json(created);
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint (idCarta)
        if (error.code === 'P2002') {
          return res.status(409).json({ error: 'idCarta já cadastrado.' });
        }
      }
      console.error('Erro ao criar carta:', error);
      return res.status(500).json({ error: 'Erro interno ao criar carta.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

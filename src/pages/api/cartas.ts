import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ALTERAÇÃO: Adicionado suporte para GET (buscar cartas)
  if (req.method === 'GET') {
    try {
      const cartas = await prisma.carta.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json(cartas);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      return res.status(500).json({ error: 'Erro ao buscar cartas' });
    }
  }

  // Mantém o código POST existente (para cadastrar cartas)
  if (req.method === 'POST') {
    try {
      const {
        tipo,
        administradora,
        valorCredito,
        valorEntrada,
        parcelas,
        valorParcela,
        vencimento,
        comissao,
        status
      } = req.body;

      // Validações básicas
      if (!tipo || !administradora || !valorCredito || !valorEntrada || !parcelas || !valorParcela || !vencimento || !comissao || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Criar carta no banco
      const carta = await prisma.carta.create({
        data: {
          tipo,
          administradora,
          valorCredito: parseFloat(valorCredito),
          valorEntrada: parseFloat(valorEntrada),
          parcelas: parseInt(parcelas),
          valorParcela: parseFloat(valorParcela),
          vencimento,
          comissao: parseFloat(comissao),
          status
        }
      });

      return res.status(201).json(carta);
    } catch (error) {
      console.error('Erro ao criar carta:', error);
      return res.status(500).json({ error: 'Erro ao criar carta' });
    }
  }

  // ALTERAÇÃO: Atualizado para incluir GET nos métodos permitidos
  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}
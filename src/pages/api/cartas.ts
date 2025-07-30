// pages/api/cartas.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const {
      tipo,
      administradora,
      parcelas,
      valor,
      status,
    }: {
      tipo: string
      administradora: string
      parcelas: number
      valor: number
      status?: string
    } = req.body

    // validações básicas
    if (!tipo || !administradora || !parcelas || !valor) {
      return res.status(400).json({ error: 'Dados incompletos' })
    }

    const carta = await prisma.carta.create({
      data: {
        tipo,
        administradora,
        parcelas,
        valor,
        status: status ?? 'ativo',
      },
    })

    return res.status(201).json(carta)
  } catch (error) {
    console.error('API /cartas erro:', error)
    return res.status(500).json({ error: 'Erro ao cadastrar carta' })
  }
}

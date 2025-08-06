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
      valorCredito,     // ALTERAÇÃO: Campo adicionado
      valorEntrada,     // ALTERAÇÃO: Campo adicionado
      parcelas,
      valorParcela,     // ALTERAÇÃO: Campo adicionado
      vencimento,       // ALTERAÇÃO: Campo adicionado
      comissao,         // ALTERAÇÃO: Campo adicionado
      status,
    }: {
      tipo: string
      administradora: string
      valorCredito: number      // ALTERAÇÃO: Tipagem adicionada
      valorEntrada: number      // ALTERAÇÃO: Tipagem adicionada
      parcelas: number
      valorParcela: number      // ALTERAÇÃO: Tipagem adicionada
      vencimento: string        // ALTERAÇÃO: Tipagem adicionada
      comissao: number          // ALTERAÇÃO: Tipagem adicionada
      status?: string
    } = req.body

    // ALTERAÇÃO: Validações expandidas para todos os campos obrigatórios
    if (!tipo || !administradora || !valorCredito || !parcelas || !valorParcela || !vencimento || comissao === undefined) {
      return res.status(400).json({ 
        error: 'Dados incompletos',
        details: 'Todos os campos são obrigatórios: tipo, administradora, valorCredito, parcelas, valorParcela, vencimento, comissao'
      })
    }

    // ALTERAÇÃO: Validação de tipos numéricos
    if (valorCredito <= 0 || parcelas <= 0 || valorParcela <= 0 || comissao < 0) {
      return res.status(400).json({ 
        error: 'Valores inválidos',
        details: 'Valores monetários e parcelas devem ser positivos. Comissão deve ser >= 0.'
      })
    }

    const carta = await prisma.carta.create({
      data: {
        tipo,
        administradora,
        valorCredito,     // ALTERAÇÃO: Campo adicionado
        valorEntrada,     // ALTERAÇÃO: Campo adicionado
        parcelas,
        valorParcela,     // ALTERAÇÃO: Campo adicionado
        vencimento: new Date(vencimento), // ALTERAÇÃO: Conversão para Date
        comissao,         // ALTERAÇÃO: Campo adicionado
        status: status ?? 'Ativa', // ALTERAÇÃO: Corrigido valor padrão
      },
    })

    return res.status(201).json(carta)
  } catch (error) {
    console.error('API /cartas erro:', error)
    return res.status(500).json({ 
      error: 'Erro ao cadastrar carta',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    })
  }
}
export interface CredorPartner {
  id: string
  name: string
  initials: string
  /** Recency of the latest transaction, e.g. "12 days ago". */
  lastTransaction: string
  averageTransaction: string
  /** Number of transactions, used to rank the approval chance. */
  transactionCount: number
  /** Average transaction value in rupiah, used to rank the approval chance. */
  averageTransactionValue: number
}

export const credorPartners: CredorPartner[] = [
  {
    id: 'sumber-logistik',
    name: 'PT Sumber Logistik Makmur Bersama',
    initials: 'SL',
    lastTransaction: '12 days ago',
    averageTransaction: 'Rp1,4 miliar',
    transactionCount: 18,
    averageTransactionValue: 1_400_000_000,
  },
  {
    id: 'cipta-digital',
    name: 'PT Cipta Digital Solusi Mandiri',
    initials: 'CD',
    lastTransaction: '26 days ago',
    averageTransaction: 'Rp860 juta',
    transactionCount: 11,
    averageTransactionValue: 860_000_000,
  },
  {
    id: 'nusantara-teknologi',
    name: 'PT Nusantara Teknologi Prima Sejahtera',
    initials: 'NT',
    lastTransaction: '4 days ago',
    averageTransaction: 'Rp2,1 miliar',
    transactionCount: 26,
    averageTransactionValue: 2_100_000_000,
  },
  {
    id: 'karya-utama',
    name: 'PT Karya Utama Dagang Internasional',
    initials: 'KU',
    lastTransaction: '8 days ago',
    averageTransaction: 'Rp1,1 miliar',
    transactionCount: 14,
    averageTransactionValue: 1_100_000_000,
  },
]

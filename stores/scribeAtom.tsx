import { CardDetailsType, IAlertData } from '@/lib/types'
import { atom } from 'jotai'

export const scribeAtom = atom('')

export const cardsAtom = atom<CardDetailsType[]>([])

export const alertAtom = atom<IAlertData[]>([])

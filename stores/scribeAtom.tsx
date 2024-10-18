import { CardDetailsType } from '@/lib/types'
import { atom } from 'jotai'

export const scribeAtom = atom('')

export const cardsAtom = atom<CardDetailsType[]>([])

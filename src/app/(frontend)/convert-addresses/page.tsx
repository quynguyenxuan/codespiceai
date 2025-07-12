import { getMetadata } from '@/utilities/getMetadata'
import { Metadata } from 'next'
import ConvertAddressesPageClient from './page.client'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({ slug: 'convert-addresses' })
}

export default function ConvertAddressesPage() {
  return <ConvertAddressesPageClient />
}

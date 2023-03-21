"use client"

import styles from './page.module.css'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  return (
    <div>
      <button onClick={() => router.push('/kollus')}>영상으로 이동</button>
    </div>
  )
}

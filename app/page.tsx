import {v4 as uuid} from 'uuid'
import { Chat } from '@/components/chat'


export const runtime = 'edge'

export default function IndexPage() {
  const id = uuid()

  return <Chat id={id} />
}

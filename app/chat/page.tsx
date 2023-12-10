import { Chat } from '@/app/chat/components/chat'
import { v4 as uuid } from 'uuid'

export default async function IndexPage() {
  const id = uuid()

  return <Chat id={id} />
}

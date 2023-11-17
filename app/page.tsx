import {v4 as uuid} from 'uuid'
import {Chat} from '@/components/chat'

export default async function IndexPage() {
    const id = uuid()

    return <Chat id={id}/>
}

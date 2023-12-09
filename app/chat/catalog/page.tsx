import {v4 as uuid} from "uuid";
import {Chat} from "./components/chat";

const ChatCatalog = () => {
    const id = uuid()

    return <Chat id={id} api='/api/chat/catalog'/>
};

export default ChatCatalog;
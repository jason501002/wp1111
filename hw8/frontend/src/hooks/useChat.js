// import { withSuccess } from "antd/lib/modal/confirm";
import { useState } from "react";

const client = new WebSocket('ws://localhost:4000')


const useChat = () => {

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [opened, setOpened] = useState(false);

    client.onmessage = (byteString) => {
        // const {data} = byteString;
        // const [task, payload] = JSON.parse(data);
        // switch(task){
        //     case "init": {
        //         setMessages(payload)
        //         break;
        //     }
        //     case "output": {
        //         setMessages(() => 
        //         [...messages, ...payload])
        //         break;
        //     }
        //     case "status": {
        //         setStatus(payload)
        //         break;
        //     }
        //     case "cleared": {
        //         setMessages([]);
        //         break;
        //     }
        //     default: break
        // }
        const [type, data] = JSON.parse(data);
        switch (type) {
            case "CHAT": {
                setStatus({ type, msg: data.messages });
                break;
            }
            case "MESSAGE": {
                if (!status.msg) {
                setStatus({ type, msg: [data.message] });
                } else {
                setStatus(({ type, msg }) => ({
                    type,
                    msg: [...msg, data.message],
                }));
                }
                break;
            }
            default: break;
        }
        
    }

    // client.opened = () => {
    //     setOpened(true)
    // }

    // const clearMessages = () => {
    //     sendData(["clear"])
    // }

    // const client = new WebSocket('ws://localhost:4000')
    const sendData = async (data) => {
        await client.send( JSON.stringify(data));
    };
    

    const sendActive = (payload) => {
        // console.log(payload);
        const names = payload.split("_");
        const data = {
            type: "CHAT",
            data: { name: names[0], to: names[1] },
        };
        sendData(data);
    };

    const sendMessage = (payload) => {
        // setMessages([...messages, payload]);
        // setStatus({type: "success", msg: "Message sent."})
        // console.log(payload);
        // sendData(["input", payload])

        const names = payload.key.split("_");
        const data = {
            type: "MESSAGE",
            data: { name: names[0], to: names[1], body: payload.body },
        };
        sendData(data);
    }


    return {
        status, sendMessage, sendActive
    };
};



export default useChat;



// yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-arrow-functions dotenv-defaults



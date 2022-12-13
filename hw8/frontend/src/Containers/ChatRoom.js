import "../App.css";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import Message from "../Components/Message"

import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;

const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");

    const addChatBox = () => { setModalVisible(true); };
    
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox(displayStatus, activeKey);
    const { status, sendMessage, sendActive } = useChat();
    return (
    <>
        <div className="App-title">
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className="App-messages">
            <Tabs 
                type="editable-card" 
                onEdit={(targetKey, action) => {
                    if (action === "add") {addChatBox();}
                    else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                }} 
                activeKey={activeKey} 
                onChange={(key) => { setActiveKey(key); }}
            >
                {chatBoxes.map(({ friend, key, chatLog }) => {
                        console.log(key, chatLog);
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                            <div className="message-box">
                                {chatLog && chatLog.map(({ name, body }) => (
                                    <Message mine={name === me} name={name} body={body} />
                                ))}
                            </div>
                            </TabPane>
                        );
                    }
                )}
                
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    if(name === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'name required'
                        })
                    }else{
                        createChatBox(name, me)
                        setActiveKey(me <= name ?
                            `${me}_${name}` : `${name}_${me}`);
                        setModalVisible(false);
                    }
                    
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
            />
        </div>
        <Input.Search
            value={messageInput}
            onChange={(e) => 
            setMessageInput(e.target.value)}
            enterButton="Send"
            placeholder=
            "Enter message here"
            onSearch={(msg) => {
                if (!msg) {
                    displayStatus({
                        type: "error",
                        msg: "Please enter message.",
                    });
                    return;
                }
                else if (activeKey === "") {
                    displayStatus({
                        type: "error",
                        msg: "Please add a chatbox first.",
                    });
                    setMessageInput("");
                    return;
                }
                sendMessage({ key:activeKey, sender:me, body:msg });
                setMessageInput("");
            }}
        ></Input.Search> 
    </>);
};
export default ChatRoom;
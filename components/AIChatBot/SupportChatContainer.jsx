"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ImCross } from 'react-icons/im'
import { BsFillSendFill } from 'react-icons/bs'
import Messages from "./Messages";


export default function SupportChatContainer({ setChatOpened }) {
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState("")

  const id = Math.ceil(Math.random() * 100000000)
  const url = "https://api.openai.com/v1/chat/completions"

  async function handleSendMessage() {
      const newMessage = { id, content: messageContent, owner: "owner" };
      setMessages(prevMessages => [...prevMessages, newMessage])
      const messageContentToBeSent = messageContent  
      setMessageContent("");

      const response = await fetch(url, {
        method : "POST",
        headers : {
          Authorization : `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          'content-type' : 'application/json' 
        },
        body : JSON.stringify({
          model : "gpt-3.5-turbo",
          messages :  [
            {
              "role": "user",
              "content": messageContentToBeSent
            }
          ],
          max_tokens : 300
        })        
      })

      if (response.ok) {
        let answer = await response.json()
        setMessages(prevMessages => [...prevMessages, { id : id + 1, content: answer?.choices[0]?.message.content, owner: "ai" }])
        console.log(answer)
        console.log("Calling from here")
      } else {
        console.error("Failed to send message");
      }
    }
  return (
    <main className="flex flex-col w-[24rem] rounded-lg h-[30rem] bg-white bottom-8 right-8 border border-gray-200">
       <nav className="bg-[#3fb8f0] py-3 text-white items-center rounded-t-lg">
            <div className="justify-between px-4 flex">
                <h3>Your AI assistant</h3>
                <div onClick={() => setChatOpened(false)} className="text-xl cursor-pointer">
                    <ImCross />
                </div>
            </div>
        </nav> 
      <div className="w-full h-full flex flex-col bg-white">
        <Messages chatbot={true} messages={messages}/>
        <div className="w-full space-x-4 flex items-center justify-between px-4 py-4">
        <input type="text" value={messageContent} onChange={e => setMessageContent(e.target.value)} placeholder={"Enter Your Questions Here"} className="h-[3rem] z-10 overflow-wrap px-4 w-[90%] text-lg placeholder:text-gray-400 border border-gray-300 text-black bg-white focus:outline-none rounded-full" />
        <div onClick={handleSendMessage} className="rounded-full text-2xl text-black">
            <BsFillSendFill />
        </div>
        </div>
      </div>
    </main>
  )
}


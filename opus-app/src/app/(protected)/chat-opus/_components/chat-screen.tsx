'use client'

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Paperclip,
  Send,
  Mic,
} from "lucide-react"
interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatScreen({ name }: {name: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

   

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simular resposta do assistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Olá! Como posso ajudá-lo hoje?",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-screen bg-background">
    

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {!hasMessages ? (
          /* Estado inicial - Input centralizado */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold mb-2">Olá {name}!</h1>
              <p className="text-xl text-muted-foreground">O que posso fazer por você?</p>
            </div>

            <div className="w-full max-w-2xl">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Envie uma tarefa ou pergunte qualquer coisa"
                  className="w-full h-14 pl-4 pr-32 text-base bg-muted/50 border-muted-foreground/20 rounded-xl"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Estado com mensagens */
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                    </div>
                    {message.isUser && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>RV</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Input fixo na parte inferior */}
            <div className=" p-4 mb-16 border-t">
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="w-full h-12 pl-4 pr-16 bg-muted/50 border-muted-foreground/20 rounded-xl"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

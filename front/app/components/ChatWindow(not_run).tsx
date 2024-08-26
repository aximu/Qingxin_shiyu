"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { applyPatch } from "@langchain/core/utils/json_patch";

import { EmptyState } from "./EmptyState";
import { ChatMessageBubble, Message } from "./ChatMessageBubble";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { marked } from "marked";
import { Renderer } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/gradient-dark.css";

import "react-toastify/dist/ReactToastify.css";
import {
  Heading,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Select, Link } from "@chakra-ui/react";
import { Source } from "./SourceBubble";
import { apiBaseUrl } from "../utils/constants";

const MODEL_TYPES = [
  "openai_gpt_3_5_turbo",
  "anthropic_claude_3_sonnet",
  "google_gemini_pro",
  "fireworks_mixtral",
  "cohere_command",
];

import { keyframes } from '@emotion/react';

// 定义一个简单的动画
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const defaultLlmValue =
  MODEL_TYPES[Math.floor(Math.random() * MODEL_TYPES.length)];

export function ChatWindow(props: { conversationId: string }) {
  const conversationId = props.conversationId;

  const searchParams = useSearchParams();

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [llm, setLlm] = useState(
    searchParams.get("llm") ?? "openai_gpt_3_5_turbo",
  );
  const [llmIsLoading, setLlmIsLoading] = useState(true);
  useEffect(() => {
    setLlm(searchParams.get("llm") ?? defaultLlmValue);
    setLlmIsLoading(false);
  }, []);

  const [chatHistory, setChatHistory] = useState<
    { human: string; ai: string }[]
  >([]);

  const [sessionId, setSessionId] = useState<string | null>(null); // 保存 sessionId
  const [isFirstMessage, setIsFirstMessage] = useState(true); // 判断是否为第一次消息

  useEffect(() => {
    // 当组件挂载时，尝试从 Cookie 中获取 sessionId
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find(row => row.startsWith("session_id="));
    if (sessionCookie) {
        setSessionId(sessionCookie.split("=")[1]);
    }
}, []);


//   const sendMessage = async (message?: string) => {
//     if (messageContainerRef.current) {
//         messageContainerRef.current.classList.add("grow");
//     }
//     if (isLoading) {
//         return;
//     }
//     const messageValue = message ?? input;
//     if (messageValue === "") return;
//     setInput("");
//     setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: Math.random().toString(), content: messageValue, role: "user" },
//     ]);
//     setIsLoading(true);

//     let accumulatedMessage = "";
//     let sources: Source[] | undefined = undefined;
//     let messageIndex: number | null = null;

//     let renderer = new Renderer();
//     renderer.paragraph = (text) => {
//         return text + "\n";
//     };
//     renderer.list = (text) => {
//         return `${text}\n\n`;
//     };
//     renderer.listitem = (text) => {
//         return `\n• ${text}`;
//     };
//     renderer.code = (code, language) => {
//         const validLanguage = hljs.getLanguage(language || "")
//             ? language
//             : "plaintext";
//         const highlightedCode = hljs.highlight(
//             validLanguage || "plaintext",
//             code,
//         ).value;
//         return `<pre class="highlight bg-gray-700" style="padding: 5px; border-radius: 5px; overflow: auto; overflow-wrap: anywhere; white-space: pre-wrap; max-width: 100%; display: block; line-height: 1.2"><code class="${language}" style="color: #d6e2ef; font-size: 12px; ">${highlightedCode}</code></pre>`;
//     };
//     marked.setOptions({ renderer });
//     try {
//         const response = await fetch('http://192.168.3.121:8083/cailichat/invoke', {
//             method: 'POST',
//             headers: {
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ user_input: messageValue }),
//         });
//         const data = await response.json();
//         accumulatedMessage = data.result;

//         const parsedResult = marked.parse(accumulatedMessage);

//         setMessages((prevMessages) => {
//             let newMessages = [...prevMessages];
//             if (
//                 messageIndex === null ||
//                 newMessages[messageIndex] === undefined
//             ) {
//                 messageIndex = newMessages.length;
//                 newMessages.push({
//                     id: Math.random().toString(),
//                     content: parsedResult.trim(),
//                     role: "assistant",
//                 });
//             } else if (newMessages[messageIndex] !== undefined) {
//                 newMessages[messageIndex].content = parsedResult.trim();
//             }
//             return newMessages;
//         });

//         setChatHistory((prevChatHistory) => [
//             ...prevChatHistory,
//             { human: messageValue, ai: accumulatedMessage },
//         ]);
//         setIsLoading(false);
//     } catch (e) {
//         setMessages((prevMessages) => prevMessages.slice(0, -1));
//         setIsLoading(false);
//         setInput(messageValue);
//         throw e;
//     }
// };

const sendMessage = async (message?: string) => {
  if (messageContainerRef.current) {
    messageContainerRef.current.classList.add("grow");
  }
  if (isLoading) {
    return;
  }
  const messageValue = message ?? input;
  if (messageValue === "") return;
  setInput("");
  setMessages((prevMessages) => [
    ...prevMessages,
    { id: Math.random().toString(), content: messageValue, role: "user" },
  ]);
  setIsLoading(true);

  try {
    // 从 Cookie 中获取 session_id
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find(row => row.startsWith("session_id="));
    const sessionId = sessionCookie ? sessionCookie.split("=")[1] : null;

    const response = await fetch('https://192.168.3.121:8083/cailichat/invoke', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': sessionId ? `session_id=${sessionId}` : '', // 添加 session_id 到 headers
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        user_input: messageValue,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const result = data.result;

    // 在首次请求时保存 sessionId
    if (isFirstMessage) {
      setSessionId(data.session_id);
      setIsFirstMessage(false);
      // 更新 Cookie
      document.cookie = `session_id=${data.session_id}; path=/`;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), content: result, role: "assistant" },
    ]);
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { human: messageValue, ai: result },
    ]);
    setIsLoading(false);
  } catch (e) {
    setMessages((prevMessages) => prevMessages.slice(0, -1));
    setIsLoading(false);
    setInput(messageValue);
    throw e;
  }
};


  const sendInitialQuestion = async (question: string) => {
    await sendMessage(question);
  };

  const insertUrlParam = (key: string, value?: string) => {
    if (window.history.pushState) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value ?? "");
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.pushState({ path: newurl }, "", newurl);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 rounded grow max-h-full">
      <Flex
        direction={"column"}
        alignItems={"center"}
        marginTop={messages.length > 0 ? "" : "64px"}
      >
        <Heading
          fontSize={messages.length > 0 ? "4xl" : "5xl"}
          fontWeight={"bold"}
          mb={1}
          color={"black"}
          css={{
            animation: `${pulse} 2s infinite`, // 添加动画
          }}
        >
          ✨ 清心食语 ✨ 
        </Heading>
        {messages.length > 0 ? (
          <Heading fontSize="md" fontWeight={"normal"} mb={1} color={"black"}>
            我们感谢您的反馈！
          </Heading>
        ) : (
          <Heading
            fontSize="xl"
            fontWeight={"normal"}
            color={"black"}
            marginTop={"10px"}
            textAlign={"center"}
          >
            问我任何关于法律相关的问题！
            {/* Ask me anything about LangChain&apos;s{" "}
            <Link href="https://python.langchain.com/" color={"blue.200"}>
              Python documentation!
            </Link> */}
          </Heading>
        )}
        {/* <div className="text-white flex flex-wrap items-center mt-4">
          <div className="flex items-center mb-2">
            <span className="shrink-0 mr-2">Powered by</span>
            {llmIsLoading ? (
              <Spinner className="my-2"></Spinner>
            ) : (
              <Select
                value={llm}
                onChange={(e) => {
                  insertUrlParam("llm", e.target.value);
                  setLlm(e.target.value);
                }}
                width={"240px"}
              >
                <option value="openai_gpt_3_5_turbo">GPT-3.5-Turbo</option>
                <option value="anthropic_claude_3_sonnet">Claude 3 Sonnet</option>
                <option value="google_gemini_pro">Google Gemini Pro</option>
                <option value="fireworks_mixtral">
                  Mixtral (via Fireworks.ai)
                </option>
                <option value="cohere_command">Cohere</option>
              </Select>
            )}
          </div>
        </div> */}
      </Flex>
      <div
        className="flex flex-col-reverse w-full mb-2 overflow-auto"
        ref={messageContainerRef}
      >
        {messages.length > 0 ? (
          [...messages]
            .reverse()
            .map((m, index) => (
              <ChatMessageBubble
                key={m.id}
                message={{ ...m }}
                aiEmoji="🦜"
                isMostRecent={index === 0}
                messageCompleted={!isLoading}
              ></ChatMessageBubble>
            ))
        ) : (
          <EmptyState onChoice={sendInitialQuestion} />
        )}
      </div>
      <InputGroup size="md" alignItems={"center"}>
        <AutoResizeTextarea
          value={input}
          maxRows={5}
          marginRight={"56px"}
          // placeholder="What does RunnablePassthrough.assign() do?"
          placeholder="您想咨询什么...?"
          textColor={"black"}
          borderColor={"rgb(58, 58, 61)"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            } else if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              setInput(input + "\n");
            }
          }}
        />
        <InputRightElement h="full">
          <IconButton
            colorScheme="blue"
            rounded={"full"}
            aria-label="Send"
            icon={isLoading ? <Spinner /> : <ArrowUpIcon />}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          />
        </InputRightElement>
      </InputGroup>

      {/* {messages.length === 0 ? (
        <footer className="flex justify-center absolute bottom-8">
          <a
            href="https://github.com/langchain-ai/chat-langchain"
            target="_blank"
            className="text-white flex items-center"
          >
            <img src="/images/github-mark.svg" className="h-4 mr-1" />
            <span>View Source</span>
          </a>
        </footer>
      ) : (
        ""
      )} */}
    </div>
  );
}

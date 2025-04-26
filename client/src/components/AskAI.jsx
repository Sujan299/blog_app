import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const AskAI = ({mainTheme}) => {
    console.log("re-rendering")
    const [text, setText] = useState("");
    const [arrContent, setArrContent] = useState([])
    const [thinking, setThinking] = useState(false);
    const notify = () => toast(msg);
    const scrollObj = useRef(null);
    useEffect(()=>{
        scrollObj.current.scrollIntoView({
            behavior: "smooth"
        })
    },[arrContent])
    const handleClick = async (text) => {
        setArrContent(prevContent => [...prevContent, text]);
        setThinking(true)
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: "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", // Replace with your API key
            dangerouslyAllowBrowser: true,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "My AI App",
            },
        });

        try {
            const completion = await openai.chat.completions.create({
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "user",
                        content: text,
                    },
                ],
            });
            setText("")
            console.log("Full API Response:", completion);
            if (!completion.choices || completion.choices.length === 0) {
                console.error("API did not return valid choices:", completion);
                setArrContent(prevContent => [...prevContent, "Server is busy !"])
                setThinking(false)
                return;
            }
            console.log("AI Response:", completion.choices[0].message.content);
            setArrContent(prevContent => [...prevContent, completion.choices[0].message.content])
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setArrContent(prevContent => [...prevContent, "Server is busy !"])
        }
        setThinking(false)
    }
    return (
        <div className={` py-6 sm:mx-0 px-4 h-[80vh] overflow-y-auto ${mainTheme}`}>
            <div className={`flex flex-col justify-center`} style={{ maxHeight: "auto" }}>
                <div className='flex flex-col'>
                    {
                        arrContent.map((item, index) => {
                            let style;
                            if (index % 2 !== 0) {
                                style = "border-none"
                            } else {
                                if (mainTheme === "bg-light_dark text-white") {
                                    style = "bg-brown_color rounded-2xl border-none"
                                } else {
                                    style = "bg-white rounded-2xl"

                                }
                            }
                            return <div key={index} className={`${style} w-full max-w-lg mx-auto p-4 flex flex-col justify-center gap-2 border border-gray-300`}>
                                <ReactMarkdown>
                                    {item}
                                </ReactMarkdown>

                            </div>
                        })
                    }
                </div>
                {
                    thinking && <div className="w-full max-w-lg mx-auto p-4 flex items-center gap-2 rounded-lg">Thinking...</div>
                }
                {/* // scrolling useEffect  */}
                {/* <div ref={messagesEndRef} /> */}
                <div  ref={scrollObj} className={`w-full max-w-lg mx-auto p-4 flex items-center gap-2 border border-gray-300 rounded-lg`}>
                    <textarea
                        className="rounded-md w-full p-3 resize-none focus:outline-none"
                        style={{ minHeight: "80px", maxHeight: "40vh", height: "auto" }}
                        rows={1}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        placeholder="Ask me..."
                    ></textarea>
                     <ToastContainer
                     position="top-center"
                     autoClose={2000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick={false}
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"
                     transition={Bounce}
                      />
                    <button
                        className="p-2 cursor-pointer bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => { if(text !== ""){
                            handleClick(text)
                        }else{
                            notify("You have to enter something...")
                        } }}
                    >
                        <FaPaperPlane size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AskAI;


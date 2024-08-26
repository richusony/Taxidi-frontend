import moment from "moment";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import AdminSideBar from '../../components/AdminSideBar';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { extractTime, getTodayDate, getYesterdayDate } from "../../utils/helper.js"
import { faPaperPlane, faVideo } from '@fortawesome/free-solid-svg-icons';
import useRealTimeMsg from "../../hooks/useRealTimeMsg";

const AdminHostChatPage = () => {
    const lastMessage = useRef();
    const { email } = useParams();
    const [inputMsg, setInputMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(`Host Chat`);
    const [previousMsg, setPreviousMsg] = useState([]);
    const [recentMessage, setRecentMessage] = useState([]);
    const [userIsTyping, setUserIsTyping] = useState(false);
    const [realTimeMessages, setRealTimeMessages] = useState([]);
    const [formattedRealTimeMsg, setFormattedRealTimeMsg] = useState([]);

    useEffect(() => {
        fetchHostMessages();
    }, []);

    useEffect(() => {
        const grouped = groupMessagesByDate(realTimeMessages);
        setFormattedRealTimeMsg(grouped);
        console.log("grouped", formattedRealTimeMsg);
    }, [realTimeMessages]);

    const date = new Date();
    // const todayDate = date.toDateString();
    // const yesterdayDate = getYesterdayDate();

    // console.log(todayDate);

    const fetchHostMessages = async () => {
        try {
            const res = await axiosInstance.get("/admin/get-messages/" + email);
            // console.log(res);
            const groupedMessages = groupMessagesByDate(res?.data);
            setMessages(groupedMessages);
            setRecentMessage([]);
            setRealTimeMessages([]);
            lastMessage.current?.scrollIntoView({ behaviour: "smooth" });
        } catch (error) {
            console.log(error);
        }
    }

    useRealTimeMsg(realTimeMessages, setRealTimeMessages);

    const handleSubmit = async () => {
        const reqData = {
            message: inputMsg.trim(),
            to: email.trim()
        }

        try {
            const res = await axiosInstance.post("/admin/send-message", reqData);
            console.log(res);
            setInputMsg("");
            setRecentMessage(prev => [...prev, inputMsg]);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to group messages by date
    function groupMessagesByDate(messages) {
        const groupedMessages = [];

        messages.forEach(message => {
            const date = new Date(message.createdAt);
            const dateString = date.toDateString();

            // Check if the date already exists in groupedMessages
            const existingDateIndex = groupedMessages.findIndex(item => item.dateString === dateString);

            // If the date exists, push the message to its messages array
            if (existingDateIndex !== -1) {
                groupedMessages[existingDateIndex].messages.push(message);
            } else {
                // If the date doesn't exist, create a new entry
                groupedMessages.push({
                    dateString: dateString,
                    dateObject: date,
                    messages: [message],
                });
            }
        });

        return groupedMessages;
    }

    // Function to format date for comparison
    const formatDateForComparison = (date) => moment(date).startOf('day').toDate();

    const today = formatDateForComparison(new Date());
    const yesterday = formatDateForComparison(moment().subtract(1, 'days').toDate());

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />


            <div className='w-[80%] relative'>
                <div className='mt-2 h-screen relative border-2 border-y'>
                    <div className='py-2 px-2 flex justify-between items-center shadow-md rounded-b'>
                        <div className='flex items-center'>
                            <div className='w-12 h-12'>
                                <img className='w-full h-full object-cover rounded-full' src="https://gravatar.com/images/homepage/avatar-01.png" alt="host-image" />
                            </div>
                            <h1 className='ml-2 font-semibold'>Richu Sony</h1>
                        </div>

                        <div>
                            <button className='transition-all delay-150 ease-linear border border-[#593CFB] px-4 py-1 text-[#593CFB] hover:bg-[#593CFB] hover:text-white shadow-md rounded '><FontAwesomeIcon icon={faVideo} /> Call </button>
                        </div>
                    </div>

                    {/* Chats  */}
                    <div key="messagesContainer" className="px-3 h-[81vh] overflow-auto scroll-smooth">
                        {messages.length > 0 && messages.map((msg, index) => (
                            <div key={"messagesContainer" + index}>
                                <div key={"date" + msg._id} className="my-10 text-center">
                                    <span className="px-3 py-2 bg-white rounded-md shadow-xl text-gray-700">
                                        {formatDateForComparison(msg.dateString).getTime() === today.getTime() ? "Today" :
                                            formatDateForComparison(msg.dateString).getTime() === yesterday.getTime() ? "Yesterday" :
                                                moment(msg.dateString).format('DD-MM-YYYY')}
                                    </span>
                                </div>

                                {msg.messages.length > 0 && msg.messages.map((msgs) =>
                                    msgs.msgFrom == "admin@gmail.com" ? (
                                        <div key={msgs._id} ref={lastMessage} className="my-2 w-full flex justify-end">
                                            <div className="py-1 px-2 max-w-[80%] md:w-fit bg-[#FFFFFF]  rounded-xl shadow-md">
                                                <p className="text-gray-700 break-words">{msgs.message}</p>
                                                <div className="text-end text-xs">
                                                    <p className="text-slate-500">{extractTime(msgs.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div ref={lastMessage} key={msgs._id} className="my-2 w-full flex justify-start">
                                            <div className="py-1 px-2 max-w-[80%] md:w-fit bg-[#7351F2] rounded-xl shadow-md">
                                                <p className="text-white dark:text-gray-800 break-words">{msgs.message}</p>
                                                <div className="text-end text-xs">
                                                    <p className="text-gray-200 dark:text-gray-700">
                                                        {extractTime(msgs.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                        {formattedRealTimeMsg?.length > 0 && formattedRealTimeMsg[0]?.messages?.map((msgs, index) => msgs.msgFrom == "taxidi@gmail.com" ? (
                            <div key={index} ref={lastMessage} className="my-2 w-full flex justify-end">
                                <div className="py-1 px-2 max-w-40 md:w-fit bg-[#FFFFFF] rounded-xl shadow-md">
                                    <p className="text-gray-700">{msgs.message}</p>
                                    <div className="text-end text-xs">
                                        <p className="text-slate-500">{"just now"}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div ref={lastMessage} key={index + 1} className="my-2 w-full flex justify-start">
                                <div className="py-1 px-2 max-w-40 md:w-fit bg-[#7351F2] rounded-xl shadow-md">
                                    <p className="text-white dark:text-gray-800">{msgs.message}</p>
                                    <div className="text-end text-xs">
                                        <p className="text-gray-200 dark:text-gray-700">
                                            {"just now"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {
                            recentMessage.length > 0 ? recentMessage.map((recent, index) => (
                                <div ref={lastMessage} key={"recent" + index + 1} className="my-2 w-full flex justify-end">
                                    <div className="py-1 px-2 max-w-40 md:w-fit bg-[#FFFFFF] rounded-xl shadow-md">
                                        <p className="text-white dark:text-gray-800">{recent}</p>
                                        <div className="text-end text-xs">
                                            <p className="text-gray-200 dark:text-gray-700">
                                                {"just now"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )) : ""
                        }

                        <div className={`transition delay-100 ease-linear w-11 h-9 rounded-2xl ${userIsTyping ? "" : "opacity-0"} bg-[#7351F2] text-white flex justify-center items-center`}>
                            {userIsTyping && <span className="text-xl font-bold flex justify-center items-center dot-container">
                                <span key="dot1" className="dot dot1"></span>
                                <span key="dot2" className="dot dot2"></span>
                                <span key="dot3" className="dot dot3"></span>
                            </span>}
                        </div>
                    </div>


                    {/* Submit Message  */}
                    <div>
                        <div className='flex absolute w-full bottom-0 z-50'>
                            <textarea value={inputMsg} className='outline-none border-2 w-full border-[#593CFB] px-2 py-1 rounded' onChange={(e) => setInputMsg(e.target.value)} placeholder='write something...' name="reviewMsg" id="reviewMsg"></textarea>
                            <div className='flex justify-center items-center'><button onClick={handleSubmit} className='transition delay-150 ease-linear ml-4 px-4 py-3 bg-[#593CFB] hover:scale-105 rounded-full shadow-md'><FontAwesomeIcon className='text-white' icon={faPaperPlane} /></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHostChatPage
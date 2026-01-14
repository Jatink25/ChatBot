import {useState} from 'react';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {

        const newChatMessages = [
            ...chatMessages,                     //copying chatmessages (arr[0]) to setChatmessage
            {
                message: inputText,                 //add new chat message at the end
                sender: 'user',
                id: crypto.randomUUID()
            }

        ]
        setChatMessages(newChatMessages);


        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,                     //copying chatmessages (arr[0]) to setChatmessage
            {
                message: response,                 //add new chat message at the end
                sender: 'robot',
                id: crypto.randomUUID()
            }

        ]);

        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to ChatBot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
            />
            <button
                onClick={sendMessage}

                className="send-button"
            >Send</button>
        </div>
    );
}
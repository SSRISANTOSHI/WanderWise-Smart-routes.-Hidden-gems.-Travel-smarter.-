// --- Chatbot JavaScript ---
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot .close-btn");

// This is the crucial part that makes the chatbot visible
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});

// This allows the user to close it
closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
});

// The rest of the chatbot logic for sending messages...
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";

    const outgoingChatLi = document.createElement("li");
    outgoingChatLi.classList.add("chat", "outgoing");
    outgoingChatLi.innerHTML = `<p>${userMessage}</p>`;
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = document.createElement("li");
        incomingChatLi.classList.add("chat", "incoming");
        incomingChatLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>Let me check the best options for that...</p>`;
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 800);
}

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});
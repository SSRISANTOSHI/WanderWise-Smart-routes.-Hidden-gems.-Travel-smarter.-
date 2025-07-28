const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot .close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

chatbotToggler.addEventListener("click", () =>
  document.querySelector(".chatbot").classList.toggle("active")
);
closeBtn.addEventListener("click", () =>
  document.querySelector(".chatbot").classList.remove("active")
);

const createChatLi = (message, className) => {
  const li = document.createElement("li");
  li.classList.add("chat", className);
  let content =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  li.innerHTML = content;
  return li;
};

const handleChat = async () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.appendChild(createChatLi("Thinking...", "incoming"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });


    const data = await response.json();
    const botReply = data.reply || "Sorry, no reply.";
    chatbox.lastChild.querySelector("p").textContent = botReply;
  } catch (error) {
    chatbox.lastChild.querySelector("p").textContent =
      "Oops, something went wrong.";
    console.error("Fetch error:", error);
  }
};

sendChatBtn.addEventListener("click", handleChat);

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const historyList = document.getElementById("historyList");
const newChatButton = document.getElementById("newChat");
const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.querySelector(".sidebar");

let chatHistory = [];

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    if (type === "ai") {

        message.innerHTML = `
            <div class="avatar">C</div>
            <div class="bubble"></div>
        `;

        message.querySelector(".bubble").textContent = text;

    } else {

        message.innerHTML = `
            <div class="bubble"></div>
        `;

        message.querySelector(".bubble").textContent = text;
    }

    messages.appendChild(message);

    const chat = document.querySelector(".chat");

    chat.scrollTop = chat.scrollHeight;
}


function showTyping() {

    const message = document.createElement("div");

    message.className = "message ai";

    message.id = "typing";

    message.innerHTML = `
        <div class="avatar">C</div>
        <div class="bubble typing">
            Ciphercode is thinking...
        </div>
    `;

    messages.appendChild(message);

    document.querySelector(".chat").scrollTop =
        document.querySelector(".chat").scrollHeight;
}


function removeTyping() {

    document.getElementById("typing")?.remove();

}


function addHistory(text) {

    const item = document.createElement("div");

    item.className = "history-item";

    item.textContent = text;

    historyList.prepend(item);

}


async function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    welcome.style.display = "none";

    addMessage(text, "user");

    addHistory(text);

    chatHistory.push({
        role: "user",
        content: text
    });

    messageInput.value = "";

    messageInput.style.height = "auto";

    showTyping();


    /*
     * TADY POZDĚJI NAPOJÍME TVŮJ SKUTEČNÝ AI BACKEND.
     */


    await new Promise(resolve => setTimeout(resolve, 800));

    removeTyping();


    addMessage(
        "Frontend Ciphercode je připravený. Až připojíš svůj AI backend, budou se zde zobrazovat skutečné odpovědi.",
        "ai"
    );


    chatHistory.push({
        role: "assistant",
        content: "Frontend Ciphercode je připravený."
    });

}


sendButton.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", event => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


messageInput.addEventListener("input", () => {

    messageInput.style.height = "auto";

    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 180) + "px";

});


newChatButton.addEventListener("click", () => {

    messages.innerHTML = "";

    chatHistory = [];

    welcome.style.display = "block";

    messageInput.focus();

});


document.querySelectorAll(".suggestions button").forEach(button => {

    button.addEventListener("click", () => {

        messageInput.value = button.dataset.prompt;

        messageInput.focus();

    });

});


mobileMenu.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});
const messageArea = document.getElementById("message_area");
const textArea = document.getElementById("textarea");
const button = document.getElementById("button");

async function postChatData(text) {
    const url = "/chatdata";
    const options = { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text }) };
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
}

async function getChatData() {
    const url = "/chatdata";
    const options = { method: "GET" };
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
}

function updateMessageArea(chatData) {
    messageArea.innerHTML = "";
    let lastDiv = null;
    for (const data of chatData) {
        const div = document.createElement("div");
        div.className = "messages";
        div.innerText = data.text;
        messageArea.appendChild(div);
        lastDiv = div;
    }
    lastDiv.scrollIntoView();
}

button.addEventListener("click", async () => {
    const chatData = await postChatData(textArea.value);
    updateMessageArea(chatData);
    textArea.value = "";
});

textArea.addEventListener("keydown", (e) => {
    e = e || window.event;
    const key = e.which || e.keyCode || 0;

    if (key === 13) {
        e.preventDefault();
        button.click();
    }
});

window.addEventListener("load", async () => {
    const chatData = await getChatData();
    updateMessageArea(chatData);
});
const dataArea = document.getElementById("data_area");
const typed_name = document.getElementById("typed_name");
const typed_message = document.getElementById("typed_message");
const button = document.getElementById("button");

async function postChatData(name, message) {
    const url = "/chatdata";
    const options = { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, message: message }) };
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

function updateDataArea(chatData) {
    dataArea.innerHTML = "";
    let lastDiv = null;
    for (const data of chatData) {
        const div = document.createElement("div");
        div.className = "data";
        div.innerText = `${data.name}: ${data.message}`;
        dataArea.appendChild(div);
        lastDiv = div;
    }
    lastDiv.scrollIntoView();
}

button.addEventListener("click", async () => {
    if (!typed_name.value.trim()) {
        alert("Please enter your name.");
        return;
    }
    if (!typed_message.value.trim()) {
        alert("Please enter your message.");
        return;
    }
    const chatData = await postChatData(typed_name.value, typed_message.value);
    updateDataArea(chatData);
    message.value = "";
});

const onKeyPress = (e) => {
    e = e || window.event;
    const key = e.which || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        button.click();
    }
}
typed_name.addEventListener("keydown", onKeyPress);
typed_message.addEventListener("keydown", onKeyPress);

window.addEventListener("load", async () => {
    const chatData = await getChatData();
    updateDataArea(chatData);
});
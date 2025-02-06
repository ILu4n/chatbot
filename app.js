const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const btn = document.getElementById("send-btn");

// Função para adicionar mensagens ao chat com os estilos antigos
function adicionarMensagemAoChat(remetente, mensagem, tipo) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", tipo); 

    const textElement = document.createElement("p");
    textElement.textContent = mensagem;

    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para enviar a mensagem para a API
async function enviarMensagem() {
    const mensagemDoUsuario = input.value.trim();
    if (!mensagemDoUsuario) return;

    // Adiciona a mensagem do usuário ao chat com os estilos antigos
    adicionarMensagemAoChat("Você", mensagemDoUsuario, "user");
    input.value = "";

    // Adiciona o loader no chat
    const loaderId = addChaoticOrbitLoader();

    // Estrutura do corpo da requisição para a API
    const requestBody = {
        prompt: mensagemDoUsuario,
        service: "merlin-v1",
        clientid: "NBbE5kHDmT",
        projectid: "6pz1qm2kzfes4vcrnv8xos",
        tracking: "Teste da API de 3 de Janeiro",
        websearch: false
    };

    console.log("🔹 Enviando requisição para a API com body:", requestBody);

    try {
        // Envia a mensagem para a API
        const response = await fetch('https://stec.cx/saturn/single.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer uBeEOmoGh6'
            },
            body: JSON.stringify(requestBody)
        });

        console.log("🔹 Status HTTP da resposta:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
        }

        const dados = await response.json();
        console.log("🔹 Resposta da API:", dados);

        if (dados.error) {
            throw new Error(`Erro da API: ${dados.error}`);
        }

        // Remove o loader e adiciona a resposta do assistente sem "response:"
        removeChaoticOrbitLoader(loaderId);
        adicionarMensagemAoChat("Assistente", dados.response ? dados.response.replace(/^{"response":"|"}$/g, '') : "Sem resposta da API", "bot");
    } catch (erro) {
        console.error("❌ Erro:", erro);
        removeChaoticOrbitLoader(loaderId);
        adicionarMensagemAoChat("Assistente", "Ocorreu um erro ao enviar a mensagem. Tente novamente.", "bot");
    }
}

// Evento de clique no botão de enviar
btn.addEventListener("click", enviarMensagem);

// envio ao pressionar "Enter"
input.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        enviarMensagem();
    }
});

// Função para adicionar um loader de carregamento no chat
function addChaoticOrbitLoader() {
    const loaderId = `loader-${Date.now()}`;

    const loaderDiv = document.createElement("div");
    loaderDiv.classList.add("message", "bot"); // Mantendo o estilo de resposta do bot
    loaderDiv.id = loaderId;

    loaderDiv.innerHTML = `
        <p>⏳ Carregando...</p>
    `;

    chatBox.appendChild(loaderDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return loaderId;
}

// Função para remover o loader do chat
function removeChaoticOrbitLoader(loaderId) {
    const loaderDiv = document.getElementById(loaderId);
    if (loaderDiv) loaderDiv.remove();
}

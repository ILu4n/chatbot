// Configuração do Parse Back4App
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize(
  'hlVop8UfCUsuNkO9L5GELvep4t3oqUzdRYeGTzbI', // Application ID
  'dVtTbp71Clscl5gWey0tqfsElkP2MU5xXusRxuZ6'  // JavaScript Key
);

function openModal() {
    document.getElementById('leadModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('leadModal').style.display = 'none';
}

async function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value; 

    // Criar um novo objeto na classe Lead
    const Lead = Parse.Object.extend('Lead'); 
    const lead = new Lead();

    // Definir os campos
    lead.set('name', name);
    lead.set('email', email);
    lead.set('telefone', telefone); 

    try {
        await lead.save(); // Salva no banco de dados
        console.log('Lead salvo com sucesso!', { name, email, telefone });

        // Redireciona para o chat após o envio dos dados
        window.location.href = './chatbot/index.html';
    } catch (error) {
        console.error('Erro ao salvar lead:', error);
        alert('Ocorreu um erro ao salvar seus dados. Tente novamente.');
    }
}

// Fechar modal quando clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('leadModal');
    if (event.target == modal) {
        closeModal();
    }
};

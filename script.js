// Função para atualizar o status do campo em tempo real
function updateStatus(elementId, status) {
    const element = document.getElementById(elementId);
    element.textContent = status;

    // Atualiza a classe do elemento para definir a cor de fundo
    if (status === 'Online' || status === 'Funcionando' || status === 'Processando' || status === 'OK') {
      element.className = 'green';
    } else {
      element.className = 'red';
    }
  }

  // Simulação de atualização em tempo real
  setInterval(function() {
    // Atualiza o status de cada operadora aleatoriamente
    const operadoras = ['bradesco', 'cassi', 'notredame', 'intermedica', 'cabesp'];
    operadoras.forEach(function(operadora) {
      // Atualiza o status do Banco de dados aleatoriamente
      const databaseStatus = Math.random() < 0.5 ? 'Online' : 'Caiu';
      updateStatus(`${operadora}-database`, databaseStatus);

      // Atualiza o status do Roteador aleatoriamente
      const routerStatus = Math.random() < 0.5 ? 'Funcionando' : 'Falha';
      updateStatus(`${operadora}-router`, routerStatus);

      // Atualiza o status do Processamento aleatoriamente
      const processingStatus = Math.random() < 0.5 ? 'Processando' : 'Não Processando';
      updateStatus(`${operadora}-processing`, processingStatus);

      // Atualiza o status das Regras aleatoriamente
      const rulesStatus = Math.random() < 0.5 ? 'OK' : 'Problema nas regras';
      updateStatus(`${operadora}-rules`, rulesStatus);
      document.getElementById(`${operadora}-status`).innerText = rulesStatus === 'OK' ? 'Regular' : `Campos com anomalias: Verificar (${rulesStatus})`;
        
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/xml");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        var raw = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" standalone=\"yes\"?>\r\n<transacao>\r\n<tipo>solicitacao</tipo>\r\n<data>2023-03-01</data>\r\n<hora>10:57:52</hora>\r\n</transacao>";

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,       
        redirect: 'follow'
        };

        fetch("172.22.48.65:8081/validacao-anomalia", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    });
  }, 2000); // Atualiza a cada 2 segundos (2000 milissegundos)
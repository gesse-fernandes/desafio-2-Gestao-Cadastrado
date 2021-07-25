// aqui eu pego cada valores para o cep ser preenhcido
let logradouro = document.getElementById('logradouro');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let uf = document.getElementById('uf');
let cep = document.getElementById("cep");

let form = document.getElementById("form");
let fomrProduct = document.getElementById("formProduct");
//função para limpar o cep
function limpaCep() {
    logradouro.value = "";
    bairro.value = ("");
    cidade.value = ("");
    uf.value = ("");
}
//um callback para carregar os campos caso exista o cep
function callback(response) {
    if (!("erro" in response)) {
        //Atualiza os campos com os valores.
        logradouro.value = (response.logradouro);
        bairro.value = (response.bairro);
        cidade.value = (response.localidade);
        uf.value = (response.uf);
    }
    else {
        //CEP não Encontrado.
        //limpaCep();
        alert("CEP não encontrado.");
    }
}
//funcao de requisicao do cep
function apiCep(api) {

    
    var cep = api.replace(/\D/g, '');

   
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            logradouro.value = "...";
            bairro.value = "...";
            cidade.value = "...";
            uf.value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        }
        else {
            //cep é inválido.
            //limpaCep();
                    alert("CEP Invalido.");
            
        }
    } 
    else {
        //cep sem valor, limpa formulário.
        limpaCep();
    }
};
//aqui eu valido o cpf
function validaCpf(elemento) {
    cpf = elemento.value;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return alert("cpf invalido");
    
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return alert("cpf invalido");
    // Valida 1o digito 
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return alert("cpf invalido");
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return alert("cpf invalido");
    
}
//aqui eu adiciono o cliente localstorage
form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    let logradouro = document.getElementById('logradouro').value;
    let bairro = document.getElementById('bairro').value;
    let cidade = document.getElementById('cidade').value;
    let uf = document.getElementById('uf').value;
    let cep = document.getElementById("cep").value;
    let nome = document.getElementById('nome').value;
     let cpf = document.getElementById('cpf').value;
     let email = document.getElementById('email').value;
     let telefone = document.getElementById('telefone').value;
    let data = {
        nome,
        cpf,
        telefone,
        email,
        cep,
        logradouro,
        bairro,
        cidade,
        uf,

    }
    let valuesData = Object.values(data);


    let corpo = document.getElementById("clientes");
    let linha = document.createElement("tr");
    corpo.append(linha);

    valuesData.forEach(value => {
        let td = document.createElement("td");
        linha.append(td);
        td.append(value);
    });
    let cli = JSON.parse(localStorage.getItem('client')) ?? [];
    cli.push(data);

    let cliConvert = JSON.stringify(cli);

    localStorage.setItem('client', cliConvert);

    alert("Cliente Cadastrado com Sucesso");
    limparCampos();
});
//limpo os campos do cliente apos o cadastro
function limparCampos()
{
    let logradouro = document.getElementById('logradouro').value = "";
    let bairro = document.getElementById('bairro').value = "";
    let cidade = document.getElementById('cidade').value = "";
    let uf = document.getElementById('uf').value = "";
    let cep = document.getElementById("cep").value = "";
    let nome = document.getElementById('nome').value = "";
    let cpf = document.getElementById('cpf').value = "";
    let email = document.getElementById('email').value = "";
    let telefone = document.getElementById('telefone').value = "";
}
fomrProduct.addEventListener('submit', function (event) {
    event.preventDefault();
    let codigo = document.getElementById("codigo").value;
    let name = document.getElementById("name").value;
    let descricao = document.getElementById("descricao").value;
    let qtd = document.getElementById("qtd").value;
    let categorria = document.getElementById("categoria").value;
    let preco = document.getElementById("preco").value;
    let desconto = document.getElementById("desconto").value;
    let validade = document.getElementById("validade").value;
    let imagem = document.getElementById("imagem").files[0].name;
    let dataProducts = {
        codigo,
        name,
        descricao,
        qtd,
        categorria,
        preco,
        desconto,
        validade,
        imagem
    };

    let valuesProducts = Object.values(dataProducts);
    let corpo = document.getElementById("produtos");
    let linha = document.createElement("tr");
    corpo.append(linha);

    valuesProducts.forEach(value => {
        let td = document.createElement("td");
        linha.append(td);
        td.append(value);
    });
    let product = JSON.parse(localStorage.getItem('product')) ?? [];
    product.push(dataProducts);

    let prodConvert = JSON.stringify(product);

    localStorage.setItem('product', prodConvert);

    alert("produto Cadastrado com Sucesso");
    limparProdutos();
});


function limparProdutos()
{
 let codigo = document.getElementById("codigo").value = "";
 let name = document.getElementById("name").value = "";
 let descricao = document.getElementById("descricao").value = "";
 let qtd = document.getElementById("qtd").value = "";
 let categorria = document.getElementById("categoria").value = "";
 let preco = document.getElementById("preco").value = "";
 let desconto = document.getElementById("desconto").value = "";
 let validade = document.getElementById("validade").value = "";
 let imagem = document.getElementById("imagem").value = "";
}


let login1 = document.querySelector('#login1')
let labellogin1 = document.querySelector('#labellogin1')

let senha1 = document.querySelector('#senha1')
let labelSenha1 = document.querySelector('#labelSenha1')

let senha2 = document.querySelector('#senha2')
let labelSenha2 = document.querySelector('#labelSenha2')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')

let mae = document.querySelector('#mae')
let labelNomeMae = document.querySelector('#labelNomeMae')

let email = document.querySelector("#email")
let labelEmail = document.querySelector("#labelEmail")

let cpf = document.querySelector("#cpf")
let labelCpf = document.querySelector("#labelCpf")

let labelCep = document.querySelector("#labelCep")

let nascimento = document.querySelector("nascimento")
let labelNascimento = document.querySelector("#labelNascimento")

let sexo = document.querySelector('#sexo')
let labelSexo = document.querySelector('#labelSexo')

let labelTelefone = document.querySelector('#labelTelefone')
let telefone = document.querySelector('#telefone')



login1.addEventListener('keyup', () => {
    if (login1.value.length <= 5) {
        labellogin1.setAttribute('style', 'color:#FFA500')
        labellogin1.innerHTML = 'Login esta com menos de 6 caracteres'

    } else {
        labellogin1.setAttribute('style', 'color: #00FF00 ')
        labellogin1.innerHTML = 'Login:'

    }
})
senha1.addEventListener('keyup', () => {
    if (senha1.value.length <= 7) {
        labelSenha1.setAttribute('style', 'color:#FFA500')
        labelSenha1.innerHTML = 'Senha esta com menos de 8 caracteres'

    } else {
        labelSenha1.setAttribute('style', 'color: #00FF00 ')
        labelSenha1.innerHTML = 'Senha:'

    }
})

senha2.addEventListener('keyup', () => {
    if (senha2.value.length <= 7) {
        labelSenha2.setAttribute('style', 'color:#FFA500')
        labelSenha2.innerHTML = 'Senha esta com menos de 8 caracteres'

    } else {
        labelSenha2.setAttribute('style', 'color: #00FF00 ')
        labelSenha2.innerHTML = 'Senha:'

    }
})

function validatePassword() {
    if (senha1.value != senha2.value) {
        labelSenha2.setAttribute('style', 'color:#FFA500')
        labelSenha2.innerHTML = 'Senhas diferentes! '
    } else {
        labelSenha2.setAttribute('style', 'color: #00FF00 ')
        labelSenha2.innerHTML = 'Senha confirmada:'
    }
}
senha1.onchange = validatePassword;
senha2.onkeyup = validatePassword;



nome.addEventListener('keyup', () => {
    if (nome.value.length <= 14) {
        labelNome.setAttribute('style', 'color:#FFA500')
        labelNome.innerHTML = 'Seu nome deve ter no mínimo 15 caracteres'

    } else {
        labelNome.setAttribute('style', 'color: #00FF00 ')
        labelNome.innerHTML = 'Seu nome:'

    }
})
mae.addEventListener('keyup', () => {
    if (mae.value.length <= 14) {
        labelNomeMae.setAttribute('style', 'color:#FFA500')
        labelNomeMae.innerHTML = 'Nome da mãe deve ter pelos menos 15 caracteres'

    } else {
        labelNomeMae.setAttribute('style', 'color: #00FF00 ')
        labelNomeMae.innerHTML = 'nome da mãe:'

    }

})
telefone.addEventListener('keyup', () => {
    if (telefone.value.length <= 14) {
        labelTelefone.setAttribute('style', 'color:#FFA500')
        labelTelefone.innerHTML = 'telefone esta incompleto'

    } else {
        labelTelefone.setAttribute('style', 'color: #00FF00 ')
        labelTelefone.innerHTML = 'telefone confirmado:'

    }
})

sexo.addEventListener('keyup', () => {
    if (sexo.value.length == 0) {
        labelSexo.setAttribute('style', 'color:#FFA500')
        labelSexo.innerHTML = 'Escolha seu gênero '

    } else {
        labelSexo.setAttribute('style', 'color: #00FF00 ')
        labelSexo.innerHTML = 'sexo: '


    }
})

function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}
function id(el) {
    return document.getElementById(el);
}
window.onload = function () {
    id('telefone').onkeyup = function () {
        mascara(this, mtel);
    }
}
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        labelCep.setAttribute('style', 'color: #00FF00  ')
        labelCep.innerHTML = 'Cep válido:'
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        labelCep.setAttribute('style', 'color: #FFA500 ')
        labelCep.innerHTML = 'CEP não Encontrado:'
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            labelCep.setAttribute('style', 'color: #FFA500 ')
            labelCep.innerHTML = 'Cep  inválido:'
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}
function ApenasLetras(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if (
            (charCode > 64 && charCode < 91) ||
            (charCode > 96 && charCode < 123) ||
            (charCode > 191 && charCode <= 255) // letras com acentos
        ) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        alert(err.Description);
    }
}


var btn = $("#topo");

btn.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
//Darkmode 
function darkMode() {
    document.getElementById("css").href = "css/modo-dark-cadastro.css"
    document.getElementById("logo").src = "img/telecall-dark.png"
    document.getElementById("logo2").src = "img/telecall-dark.png"
}
//lighemode
function lightmode() {
    document.getElementById("css").href = "css/custom.css"
    document.getElementById("logo").src = "img/telecall.png"
    document.getElementById("logo2").src = "img/telecall.png"

}
$(document).ready(function () {
    $("#cpf").mask("999.999.999-99");
});
$(document).ready(function () {
    $("#cep").mask("99999-999");
});


function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        labelEmail.setAttribute('style', 'color: #00FF00 ')
        document.getElementById("labelEmail").innerHTML = "E-mail válido";


    }
    else {
        document.getElementById("labelEmail").innerHTML = "<font color='#FFA500'>E-mail inválido </font>";

    }
}
function _cpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
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
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}
function validarCPF(el) {
    if (!_cpf(el.value)) {
        labelCpf.setAttribute('style', 'color:#FFA500')
        labelCpf.innerHTML = 'CPF inválido!';
    } else {
        labelCpf.setAttribute('style', 'color: #00FF00 ')
        labelCpf.innerHTML = 'CPF válido! '
    }
}
//valida anivesario
function validadata() {
    var data = document.getElementById("nascimento").value; // pega o valor do input
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array

    // para o IE onde será inserido no formato dd/MM/yyyy   
    if (data_array[0].length != 4) {
        data = data_array[2] + "-" + data_array[1] + "-" + data_array[0]; // remonto a data no formato yyyy/MM/dd
    }

    // comparo as datas e calculo a idade
    var hoje = new Date ();
    var nasc = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

    if (idade < 18) {
        labelNascimento.setAttribute('style', 'color:#FFA500')
        labelNascimento.innerHTML = 'Menores de 18 anos não pode se cadastrar!';
        return false;
    }

    if (idade >= 18 && idade <= 60) {
        labelNascimento.setAttribute('style', 'color: #00FF00 ')
        labelNascimento.innerHTML = 'Data de Nascimento:';
        return true;
    }

    // se for maior que 60 não vai acontecer nada!
    return false;
}

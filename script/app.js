import  validateDate  from "./validate-date.js";
import  isCPF  from "./validate-cpf.js"
import validateCEP from "./validate-cep.js";

const $inputs = document.querySelectorAll("[required]");
const $form =  document.querySelector("[data-form]");

$form.addEventListener("submit", (e) => {
    // O default de um submit é um reload
    e.preventDefault();

    const responseList = {
        "name": e.target.elements["name"].value,
        "password": e.target.elements["password"].value,
        "email": e.target.elements["email"].value,
        "date": e.target.elements["date"].value,
        "CPF": e.target.elements["CPF"].value,
        "CEP": e.target.elements["CEP"].value,
        "city": e.target.elements["city"].value,
        "street": e.target.elements["street"].value,
        "state": e.target.elements["state"].value
    }

    // Salva no armazenamento local um item chamado register e um objeto JSON contendo os itens da lista
    localStorage.setItem('register', JSON.stringify(responseList));

    window.location.href = './cadastro-concluido.html'
})

$inputs.forEach(input =>{
    input.addEventListener("blur", (e) => {
        verifyField(e.target)
    })

    input.addEventListener("invalid", (e) => e.preventDefault()); 
    
    const $span = input.parentNode.querySelector(".error-msg");

    input.addEventListener("click", (e) => {
        hideSpan($span);
    })
    if(input.value != "" && input.name != "state") showSpan($span);
    
})

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const messages = {
    name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    password: {
        valueMissing: "O campo de senha não pode estar vazio.",
        patternMismatch: "A senha deve conter um tamanho entre 6 e 12 dígitos, deve conter uma letra maiúscula, uma minúscula, um número e um caractére especial",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    date: {
        valueMissing: 'O campo de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    CPF: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    CEP: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'Por favor, preencha um CEP válido.',
        customError: 'O CEP digitado não existe',
        tooShort: "Por favor, preencha um CEP válido." 
    },
    city: {
        valueMissing: "O campo de cidade não pode estar vazio.",
        patternMismatch: "Por favor, preencha uma cidade válida.",
    },
    street: {
        valueMissing: "O campo de logradouro não pode estar vazio.",
        patternMismatch: "Por favor, preencha um logradouro válido.",},
    state: {
        valueMissing: "O campo de estado não pode estar vazio.",
        patternMismatch: "Por favor, preencha um estado válido.",}
}

function verifyField(input){
    let msg = "";
    //Span irmão do input com a classe error-msg 
    const $errorMsg = input.parentNode.querySelector(".error-msg");
    hideSpan($errorMsg);

    if(input.name == "CPF" && input.value.length >= 11){
        isCPF(input);
    } else if (input.name == "date" && input.value != "" ){
        validateDate(input);
    } else if(input.name == "CEP" && input.value.length >= 8){
        validateCEP(input);
    }

    errorTypes.forEach(error  => {
        if(input.validity[error] && input.name != "CEP"){
            msg = messages[input.name][error]
            console.log(msg);
        }
    })


    // Se o campo não estiver válido, atribui a mensagem de erro correspondente ao span
    if(!input.checkValidity()){
        showSpan($errorMsg);
        $errorMsg.textContent = msg;
    } else {
        $errorMsg.textContent = "";
    }
}

function showSpan(span){
    span.parentElement.classList.add('input-space-error');
    span.classList.add('error-msg-show');
}

function hideSpan(span){
    span.parentElement.classList.remove('input-space-error');
    span.classList.remove('error-msg-show');
}

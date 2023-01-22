export default function validateCEP(input){
    const cepValue = input.value.replace("-","");

    const $url = `https://viacep.com.br/ws/${cepValue}/json`;
    const options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    };

    const $span = input.parentNode.querySelector(".error-msg");

    fetch($url, options)
    .then( response => {
         response.json()
         .then( data => {
            if("erro" in data){
                // Se não existe cai aqui
                input.setCustomValidity('Esse CEP não é válido');
                $span.innerHTML = 'Este CEP não existe.';
                $span.parentElement.classList.add('input-space-error');
                $span.classList.add('error-msg-show');
            }else{
                // Se é válido cai aqui
                showData(data);
                $span.parentElement.classList.remove('input-space-error');
                $span.classList.remove('error-msg-show');
            }
         })
        })
        .catch( e => {
            // Se tem 9 dígitos cai aqui
            input.setCustomValidity('Esse CEP não é válido');
            $span.innerHTML = 'Este CEP é inválido.';
            $span.parentElement.classList.add('input-space-error');
            $span.classList.add('error-msg-show');
    })

}

function showData(result){
    for(const field in result){
        let input =  document.querySelector("#"+field);
        if(input){
            input.value = result[field];
            if(input.name != 'state'){
                input.previousElementSibling.classList.add("active-label");
                input.previousElementSibling.classList.remove("inactive-label");
            }
        }
    }
}
export default function validateCEP(input) {
  const cepValue = input.value.replace("-", "");

  const $url = `https://viacep.com.br/ws/${cepValue}/json`;
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  findAdress($url, options, input);

}

async function findAdress(url, options, input){

    const $span = input.parentNode.querySelector(".error-msg");
    
    try{
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if('erro' in jsonResponse){
            input.setCustomValidity("Esse CEP não é válido");
            $span.innerHTML = "Este CEP não existe.";
            $span.parentElement.classList.add("input-space-error");
            $span.classList.add("error-msg-show");
        } else{
            showData(jsonResponse);
            $span.parentElement.classList.remove("input-space-error");
            $span.classList.remove("error-msg-show");
        }
    } catch (error) {
        input.setCustomValidity("Esse CEP não é válido");
        $span.innerHTML = "Este CEP é inválido.";
        $span.parentElement.classList.add("input-space-error");
        $span.classList.add("error-msg-show");
    }

}

function showData(result) {
  for (const field in result) {
    let input = document.querySelector("#" + field);
    if (input) {
      input.value = result[field];
      if (input.name != "state") {
        input.previousElementSibling.classList.add("active-label");
        input.previousElementSibling.classList.remove("inactive-label");
      }
    }
  }
}

const $inputLabels = document.querySelectorAll("label.input-label");

$inputLabels.forEach(element => {
    element.addEventListener("click", ()=> {
        element.classList.add("active-label");
    })
    element.nextElementSibling.addEventListener("focus", ()=> {
        element.classList.add("active-label");
        element.classList.remove("inactive-label");
    })
    element.nextElementSibling.addEventListener("focusout", ()=> {
        if(element.nextElementSibling.value == ""){
            element.classList.remove("active-label");
            element.classList.add("inactive-label");
        }
    })
});

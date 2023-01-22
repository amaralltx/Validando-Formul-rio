export default function validateDate(input){
    const dateRecieve =  new Date(input.value);
    
    if(isOverEighteen(dateRecieve)){
        input.setCustomValidity('Você deve ser maior que 18 anos para se cadastrar.');
    }
}

function isOverEighteen(date){
    const today = new Date();
    const eighteen = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());
    
    return today <= eighteen;
}
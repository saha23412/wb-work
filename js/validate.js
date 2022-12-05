const form = document.querySelector('#form')
const inputArray = document.querySelectorAll('.input__payment');
const labelArray = document.querySelectorAll('.label__payment');
const buttonOrder = document.querySelector('.total__order');
const inputTelephone = document.querySelector('#telephone')
const ruleNotSpace = /\S/;

//Проверка инпута на регулярное выражение (Проверка произойдет после того ,как пользователь уберет курсор с инпута)
function inputCheck(event, labelArray) {
    let inputValue = event.target.value.trim()
    let regRules = new RegExp(event.target.dataset.reg)
    if (!regRules.test(inputValue) && ruleNotSpace.test(inputValue)) {
        let messageError = event.target.dataset.rule
        let labelNumber = event.target.dataset.number
        labelArray[labelNumber].innerHTML = messageError
        labelArray[labelNumber].style.display = 'block'
    }
}
//Проверка инпута на регулярное выражение(Проверка происходит во время ввода символа)
function inputHandler(event, labelArray) {
    let inputValue = event.target.value
    let regRules = new RegExp(event.target.dataset.reg)
    let labelNumber = event.target.dataset.number
    if (regRules.test(inputValue)) {
        labelArray[labelNumber].style.display = 'none'
        labelArray[labelNumber].innerHTML = ''
    }
}
//Проверка инпута на обязательные поля(Проверка происходит после клика на кнопку)
function inputCheckRequired(inputArray, labelArray) {
    inputArray.forEach(input => {
        let inputValue = input.value
        if (!ruleNotSpace.test(inputValue)) {
            let messageErrorRequired = input.dataset.required
            labelArray[input.dataset.number].innerHTML = messageErrorRequired
            labelArray[input.dataset.number].style.display = 'block'
        }
    })
}
//Редактирование значения инпута под нужный формат (Маска телфона: +7 (999) 999-99-99)
function formatPhoneNumber(inputValuePhone) {
    if (!inputValuePhone) return inputValuePhone
    const phoneNumber = inputValuePhone.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 2) return `${phoneNumber.slice(0, 1) !== '7' ? `${7}` : `+${phoneNumber.slice(0, 1)}`}`
    if (phoneNumberLength < 5) return `${phoneNumber.slice(0, 1) !== '7' ? `+${7}` : `+${phoneNumber.slice(0, 1)}`} ${phoneNumber.slice(1, 4)}`
    if (phoneNumberLength < 8) {
        return `${phoneNumber.slice(0, 1) !== '7' ? `+${7}` : `+${phoneNumber.slice(0, 1)}`} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}`
    }
    if (phoneNumberLength < 10) {
        return `${phoneNumber.slice(0, 1) !== '7' ? `+${7}` : `+${phoneNumber.slice(0, 1)}`} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}`
    }
    return `${phoneNumber.slice(0, 1) !== '7' ? `+${7}` : `+${phoneNumber.slice(0, 1)}`} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`

}

form.addEventListener('input', (event) => inputHandler(event, labelArray))
buttonOrder.addEventListener("click", () => {
    inputCheckRequired(inputArray, labelArray)
})
form.addEventListener('focus', function (event) {
}, true)
inputTelephone.addEventListener('input', (event) => {
    event.target.value.replace(/[^\d]/g, '')
    const formattedInputValue = formatPhoneNumber(event.target.value)
    event.target.value = formattedInputValue
})
form.addEventListener('blur', (event) => {
    inputCheck(event, labelArray)
}, true)
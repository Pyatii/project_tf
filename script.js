const encryptedKey1 = [53, 55, 55, 53, 53, 55];


const encryptedKey2 = [99, 97];

function decryptKey1() {
    return String.fromCharCode(...encryptedKey1.map(c => c - 3));
}

function decryptKey2() {
    return String.fromCharCode(...encryptedKey2.map(c => c ^ 0x55));
}

const CORRECT_KEYS = {
    1: decryptKey1(),
    2: decryptKey2()
};

let currentLevel = 0;
const inputsContainer = document.getElementById('key-inputs-container');
const soonMessage = document.getElementById('soon-message');

function createInputElement(placeholderText, level) {
    const wrapper = document.createElement('div');
    wrapper.className = 'input-group';
    wrapper.id = `input-group-${level}`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'key-input';
    input.placeholder = `Введите ключ ${level} (Enter для проверки)`;
    input.dataset.level = level;

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInputCheck(e.target);
        }
    });

    wrapper.appendChild(input);
    return wrapper;
}

function handleInputCheck(inputElement) {
    const level = parseInt(inputElement.dataset.level);
    const enteredValue = inputElement.value.trim();

    if (level === 1 && enteredValue === CORRECT_KEYS[1]) {
        inputElement.disabled = true;
        inputElement.style.opacity = '0.6';
        showNextInput(2);
    }
    else if (level === 2 && enteredValue === CORRECT_KEYS[2]) {
        inputElement.disabled = true;
        inputElement.style.opacity = '0.6';
        showSoonMessage();
    }
    else {
        inputElement.classList.add('error');
        inputElement.value = '';
        inputElement.placeholder = 'Неверный ключ. Попробуйте снова.';
        setTimeout(() => {
            inputElement.classList.remove('error');
            inputElement.placeholder = `Введите ключ ${level}`;
        }, 1500);
    }
}

function showNextInput(level) {
    if (level > 2) return;

    const nextInput = createInputElement(`Введите ключ ${level}`, level);
    inputsContainer.appendChild(nextInput);
    currentLevel = level;
    nextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSoonMessage() {
    soonMessage.classList.remove('hidden');
    soonMessage.textContent = 'SOON';
    currentLevel = 3;
    soonMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.addEventListener('DOMContentLoaded', () => {
    const firstInput = createInputElement('Введите ключ 1', 1);
    inputsContainer.appendChild(firstInput);
    currentLevel = 1;

    setTimeout(() => {
        document.querySelector('.key-input')?.focus();
    }, 100);
});
const encryptedKey1 = [53, 55, 55, 53, 53, 55];


const encryptedKey2 = [99, 97];

const encryptedKey3 = [50, 56, 55, 49, 48, 49, 95, 115, 111, 110, 105, 99, 95, 50, 48, 48, 49];

const maxKey = 3;

function decryptKey1() {
    return String.fromCharCode(...encryptedKey1.map(c => c - 3));
}

function decryptKey2() {
    return String.fromCharCode(...encryptedKey2.map(c => c ^ 0x55));
}

function encryptKey3(plainKey) {
    return plainKey.split('').map((char, index) => {
        return char.charCodeAt(0) ^ index;
    });
}

function decryptKey3(encryptedArray) {
    return encryptedArray.map((code, index) => {
        return String.fromCharCode(code ^ index);
    }).join('');
}

const CORRECT_KEYS = {
    1: decryptKey1(),
    2: decryptKey2(),
    3: decryptKey3(encryptedKey3)
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

    if (enteredValue === CORRECT_KEYS[level]) {
        if (level === maxKey) {
            showSoonMessage();
        }
        else {
            showNextInput(level + 1);
        }
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
    if (level > maxKey) return;

    const nextInput = createInputElement(`Введите ключ ${level}`, level);
    inputsContainer.appendChild(nextInput);
    currentLevel = level;
    nextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSoonMessage() {
    soonMessage.classList.remove('hidden');
    soonMessage.textContent = 'SOON';
    currentLevel = maxKey + 1;
    soonMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.addEventListener('DOMContentLoaded', () => {
    const firstInput = createInputElement('Введите ключ 1', 1);
    inputsContainer.appendChild(firstInput);
    console.log('Ключ 3:', CORRECT_KEYS[3]);
    currentLevel = 1;

    setTimeout(() => {
        document.querySelector('.key-input')?.focus();
    }, 100);
});

function generateEncryptedKey3() {
    const plainKey = "295141_sonic_2001";
    const encrypted = plainKey.split('').map((char, index) => {
        return char.charCodeAt(0) ^ index;
    });
    console.log('encryptedKey3 = [' + encrypted.join(', ') + ']');
    return encrypted;
}

generateEncryptedKey3();
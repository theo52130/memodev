document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const output = document.getElementById('output');

    button.addEventListener('click', () => {
        // Communiquer avec le processus principal
        window.electronAPI.sendMessage('buttonClicked', 'Hello from Renderer!');
    });

    // Recevoir des messages du processus principal
    window.electronAPI.onMessage('messageFromMain', (message) => {
        output.textContent = message;
    });
});
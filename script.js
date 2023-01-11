export default class ChatWindow {
    constructor(
            text={
                heading: 'Got questions?'
            }, 
            colors={
            heading: '#9700da', 
            background: '#e9e9e9'}) {
        this.text = text
        this.colors = colors

        this.chatWindowStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
        body {
            background: #e9e9e9;
            position: relative;
            height: 100vh;
        }
        .chat-container {
            font-family: 'Raleway';
            position: fixed;
            bottom: 5px;
            right: 0px;
            width: 100%;
            pointer-events: none;
            z-index: 1000;
        }
        .chat-window {
            background: white;
            width: 400px;
            max-width: 30%;
            padding: 0;
            margin-left: auto;
            border-radius: 10px 10px 0 0;
            pointer-events: auto;
            box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
            overflow-y: hidden;
        }
        .chat-window:hover {
            cursor: pointer;
        }
        .chat-window__heading {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 15px;
            background: ${this.colors.heading};
            font-size: 30px;
            color: #f7f7f7;
        }
        .chat-icon {
            margin-left: auto;
            font-size: 30px;
        }
       `
    }

    addChatWindow() {
        // container div
        const chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');
    
        // chat window
        const chatWindow = document.createElement('div');
        chatWindow.classList.add('chat-window');
        chatContainer.appendChild(chatWindow);
    
        /*
        #
        ###### CREATE HEADING ELEMENTS
        #
        */

        // create heading
        const heading= document.createElement('h2');
        heading.classList.add('chat-window__heading')
        heading.innerHTML = `${this.text.heading}`;
        chatWindow.appendChild(heading);
    
        // create chat icon
        const iconSpan = document.createElement('span');
        iconSpan.classList.add('material-symbols-outlined', 'chat-icon');
        iconSpan.textContent = 'chat';
        heading.innerHTML += iconSpan.outerHTML
        console.log(iconSpan)
    
        // append final box to the body
        const script = document.getElementById('chat-js')
        script.insertAdjacentHTML('beforebegin', chatContainer.outerHTML)
        console.log(chatContainer)
    }
    
    injectStyles() {
        const styleTag = document.createElement('style');
        styleTag.setAttribute('type', 'text/css')
        styleTag.innerText = this.chatWindowStyles
        document.head.appendChild(styleTag);
    }

    printVars() {
        console.log('these variables are used...')
        console.log('heading: ', this.text) 
        console.log('color: ', this.colors)
    }
    
    // run the methods when calling object: inject styles, create chatWindow
    init() {
        this.injectStyles();
        this.addChatWindow();
        this.printVars();
    }

}
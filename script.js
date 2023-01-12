export default class ChatWindow {
    constructor(
            text={
                heading: 'Got questions?',
                conversation: [
                    {   
                        id: 1,
                        question: 'How can we help you?',
                        answers: ["What do you  offer?", "what do you have?"]
                    }
                ]
            }, 
            styles={
                colors : {
                    heading: '#9700da', 
                    bg: '#e9e9e9',
                    bgVendor: '#ffffff',
                    bgCustomer: '#cce3ff'
                },
                boxShadow: '5px 5px 2px 0 rgba(160,160,160,.5)'
                }) {
        this.text = text
        this.styles = styles

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
            background: ${this.styles.colors.heading};
            font-size: 30px;
            color: #f7f7f7;
        }
        .chat-icon {
            margin-left: auto;
            font-size: 30px;
        }
        .chat-window__message-box {
            padding: 10px;
            background: ${this.styles.colors.bg};
        }
        .chat-message__vendor {
            padding: 10px;
            background: ${this.styles.colors.bgVendor};
            align-self: start;
            border-radius: 10px 10px 10px 0;
            box-shadow: ${this.styles.boxShadow};
            max-width: 75%;
        }
        .chat-message__customer {
            padding: 10px;
            background: ${this.styles.colors.bgCustomer};
            text-align: right;
            margin-left: auto;
            display: inline-block;
            border-radius: 10px 10px 0px 10px;
            box-shadow: ${this.styles.boxShadow};
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
    
        /**
        *
        * <!-----CREATE HEADING ELEMENTS-----!>
        *
        **/

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

        /**
        *
        * <!-----CREATE CHAT BOX-----!>
        *
        **/

        const messagesBox = document.createElement('div');
        messagesBox.classList.add('chat-window__message-box');
        chatWindow.appendChild(messagesBox);

        const firstMessage = document.createElement('p');
        firstMessage.classList.add('chat-message__vendor');
        firstMessage.innerHTML = this.text.conversation[0].question
        messagesBox.appendChild(firstMessage);

        for (let answer of this.text.conversation[0].answers) {
            console.log(answer);
            let answerNode = document.createElement('p');
            answerNode.classList.add('chat-message__customer');
            answerNode.innerHTML = answer;
            messagesBox.appendChild(answerNode)
        }
    
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

    addEventListeners() {
        let chatBoxHeading = document.querySelector('.chat-window__heading');
        let messagesCustomer = document.querySelectorAll('.chat-message__customer')

        // event listener on parent heading
        chatBoxHeading.addEventListener('click', () => {
            console.log('clicked ', chatBoxHeading)   
        })
        // track click events on each customer message
        messagesCustomer.forEach((el) => {
            el.addEventListener('click', () => {
            console.log('clicked ', el)})
        })
        // check if additional nodes have been created

    }
    
    // run the methods when calling object: inject styles, create chatWindow
    init() {
        this.injectStyles();
        this.addChatWindow();
        this.printVars();
        this.addEventListeners();
    }

};
export default class ChatWindow {
    constructor(
            text={
                heading: 'Got questions?',
                conversation: [
                {chat: [
                    {id: 1,
                    type: 'start',
                    text: "Hey there! How can we help you?"},
                    {id: 2,
                    type: 'middle',
                    text: "Anything else?"},
                    {id: 3,
                    type: 'middle',
                    text: "What else can we do for you?"},
                    {id: 4,
                    type: 'ending',
                    text: "Thanks for chatting with us!"},

                ]},
                {options: [
                    {id: 1,
                    question: "Which products do you have",
                    answer: "You can find electronics and other cool gadgets. Check out our customer's favorite products",
                    link: "http://localhost:5500/"},
                    {id: 2,
                    question: "What's your refund policy?",
                    answer: "We have a no-hassle 30-day money-back guarantee.",
                    link: "http://localhost:5500/"},
                    {id: 3,
                    question: "Do you sell gift cards",
                    answer: "Yes, we do! Simply check out our gift cards page.",
                    link: "http://localhost:5500/"},
                    {id: 4,
                    question: "Something else!",
                    answer: "Then why don't you write us a quick email? We'll get back to you as soon as possible. You can ",
                    link: "http://localhost:5500/"},
                ]},
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
        this.text = text;
        this.styles = styles;
        this.count = 0;

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
            bottom: 10px;
            right: 10px;
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
            box-shadow: 0 10px 15px 0 rgba(0,0,0,.2);
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

    printMessages() {
        console.log(this.count, this.text.conversation)
        // problem: show first chat message and three options --object iteration
        for (this.count; this.count <= this.text.conversation.length; this.count ++) {
            console.log('iteration :', this.count)
            console.log(this.text.conversation[this.count])
        }
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
        //this.addChatWindow();
        this.printVars();
        //this.addEventListeners();
        this.printMessages();
    }

};
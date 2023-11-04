import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main() {
    console.log(colors.bold.green('Welcome to the chatbot program!'));
    console.log(colors.bold.green('You can start chatting with the bot...'));
    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '));
        try {
            //construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({role, content}));
            messages.push({role: 'user', content: userInput});

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            
            if (userInput.toLowerCase()==='bye') {
                console.log(colors.green('Bot: ') + 'Goodbye!');
                return;
            }
        
            console.log(colors.green('Bot: ')+chatCompletion.choices[0].message.content);
            //update userHistory
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', chatCompletion.choices[0].message.content]);
            
        } catch (error) {
            console.error(colors.red(error))
        }
    }
    
}

main();

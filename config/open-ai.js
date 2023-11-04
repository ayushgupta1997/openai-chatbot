import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-T0I9FjFS9ycBDAzayus2UZVXT3BlbkFJRvnQKXB9w6TvsHLW1dCJh' // This is also the default, can be omitted
});

export default openai;
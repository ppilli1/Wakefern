import {OpenAIClient, AzureKeyCredential, ChatResponseMessage} from "@azure/openai"

async function OpenAIAzureSuggestion({term}: {term: string}) {
  const fetchChatCompletion = async() => {
    const completions: (ChatResponseMessage | undefined)[] = [] // either the completion will be the ChatResponseMessage, or else it will render undefined, and the " | " operator denotes union, meaning ChatResponseMessage will render, and if it doesn't, then undefined will.
    const endpoint = process.env.ENDPOINT
    const azureApiKey = process.env.AZURE_API_KEY

    if(!endpoint) throw new Error("Missing endpoint")
    if(!azureApiKey) throw new Error("Missing Azure API Key")

    // console.log(`Using endpoint: ${endpoint} and Azure API Key: ${azureApiKey}`)
    // use the above console.log if you need to check the status of either the endpoint or the azureApiKey
    // in fact, the above if statements also verify for endpoint and azureApiKey statuses, removing the need for the console.log here

    const client = new OpenAIClient(
        endpoint,
        new AzureKeyCredential(azureApiKey)
    )

    const deploymentId = "disney-clone-mine"

    const result = await client.getChatCompletions(deploymentId, [
        {
            role: "system",
            content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide a quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`
        },
        {
            role: "user",
            content: `I like: ${term}`,
        },
    ], 
    {
        maxTokens: 128,
    })

    for (const choice of result.choices) { // map through all of the response in the scenario that there were more than 1, and then return the first item in the mapping of the completions array to ensure that the first response is returned, and not the other response in case more than 1 generated. To short cut this longer process, you could just return result.choices[0], and the same idea would have been met and accomplished.
        console.log(choice.message)
        completions.push(choice.message)
    }

    return completions[0]
  }

  // call the fetch completion
  const completion = await fetchChatCompletion()

  return (
    <div className = "flex space-x-5 mt-32 xl:mt-42 p-10 pb-0">
        <div className = "animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white"/>
        <div>
            <p className = "text-sm text-purple-400">
                Azure OpenAI Assistant Suggests:{" "}
            </p>
            <p className = "italic text-xl">{completion?.content}</p>
        </div>
    </div>
  )
}

export default OpenAIAzureSuggestion
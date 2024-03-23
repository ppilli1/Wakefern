"use client"
import useSWR from "swr"

const fetcher = (term: string) => 
    fetch("/api/suggestions?term=" + term).then((res) => res.json()) // this is the function that I can use to fetch the specific term from the API call

function AISuggestion({term}: {term: string}) {
  const {data, error, isLoading, isValidating} = useSWR(
    "suggestions", 
    () => fetcher(term), // inside this function, you pass in a key, next pass the term in the fetcher function call
    { 
      revalidateOnFocus: false,
      revalidateOnReconnent: false
    }
  ) 

  const generateText = () => {
    if(isLoading || isValidating)
    //write out how the AI Assistant will be thinking while the text is loading and validating through the AI search prompts we provided
        //here we have a loader, which will continue spinning until the output text is rendered
        return (
            <>
                <div className = "animate-spin rounded-full h-10 w-10 border-b-2 border-white"/>
                <p className = "text-sm text-gray-400">AI Assistant is thinking...</p>
            </>
        )
        

        if(error) return <>Error...</>
        if(!data) return <>No data</>

        return(
            <>
                <div className = "animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-white"/>
                <div>
                    <p className = "text-sm text-gray-400">
                        AI (Azure Functions) Assistant Suggests: {" "}
                    </p>
                    <p className = "italic text-xl">{data.message}</p>
                </div>
            </>
        )
  }

  return (
    <div className = "flex space-x-5 items-center px-10">
        {generateText()}
    </div>
  )
}

export default AISuggestion
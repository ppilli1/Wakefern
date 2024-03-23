export async function GET(request: Request){    // get the url from the get request, and then specifically get the term we want out of the URL
    const {searchParams} = new URL(request.url)
    const term = searchParams.get("term")

    // https://disney-clone-mine.azurewebsites.net/api/getaisuggestion
    const res = await fetch(
        `https://disney-clone-mine.azurewebsites.net/api/getaisuggestion?term=${term}`, 
        {
            method: "GET",
            next: {
                revalidate: 60 * 60 * 24, // 24 hours, meaning the request will only be done to OpenAI once a day for a specific key term, and since we included caching as an aspect to this project, a key term entered in the search box any time after it has already been searched within a 24 hour time period will simply output the previous result.
            }
        }
    )

    const message = await res.text();
    return Response.json({message})
}
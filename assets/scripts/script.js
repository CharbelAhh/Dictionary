function randWord(){
    let data=fetch(
        "https://random-words-api.vercel.app/word"
    );

    data.then(
        res=>res.json().then(
            data=>{
                console.log(data[0].word)
            }
        )
    )
}

randWord()

var data=fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
)

data.then(
    res=>{
        if (res.ok){
            
        }
        else{
            
        }
        res.json().then(
            data=>{console.table(data)}
        )}
)
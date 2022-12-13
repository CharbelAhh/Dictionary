function randWord(word=undefined){
    let data=fetch(
        "https://random-words-api.vercel.app/word"
    );

    data.then(
        res=>res.json().then(
            data=>{
                if (word===undefined){
                    word=data[0].word
                }
                let wordDef=fetch(
                    "https://api.dictionaryapi.dev/api/v2/entries/en/"+word
                )

                let col=document.createElement("div");
                col.classList.add("col","shadow");
                
                let dl=document.createElement("dl");
                dl.classList.add("container","text-center");

                let dt=document.createElement("dt");
                dt.textContent=word+" ";
                sound=document.createElement("button");
                sound.classList.add("fa","fa-volume-up","btn");
                dt.appendChild(sound);

                let dd=document.createElement("dd");
                
                wordDef.then(
                    res=>{
                        if (!res.ok){
                            randWord();
                            return
                        }
                        else{
                        res.json().then(
                            wordDef=>{
                                
                                dd.textContent=wordDef[0].meanings[0]["definitions"][0].definition
                                dl.appendChild(dt)                
                                col.appendChild(dl)
                                col.appendChild(dd);
                                document.getElementById("rand-words").appendChild(col);

                                sound.addEventListener("click",()=>{
                                    try{
                                        let audio=`https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/${word.toLowerCase()[0]}/${word.toLowerCase().slice(0,3)}/${word.toLowerCase()}/${word.toLowerCase()}__gb_1.mp3`;
                                        let voice=new Audio(audio);
                                        voice.play();

                                        audio=`https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/${word.toLowerCase()[0]}/${word.toLowerCase().slice(0,3)}/${word.toLowerCase()}_/${word.toLowerCase()}__gb_1.mp3`;
                                        voice=new Audio(audio);
                                        voice.play();

                                        audio=`https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/${word.toLowerCase()[0]}/${word.toLowerCase().slice(0,3)}_1/${word.toLowerCase()}_1_g/${word.toLowerCase()}_1_gb_2_abbr.mp3`;
                                        voice=new Audio(audio);
                                        voice.play();
                                    }
                                    catch{}
                                })
                            }
                        )}}
                )
            }
        )
    )
}

function genWords(){
    for (var i=0; i<8;i++)
        randWord()
}
genWords();
let search=document.getElementById("word-search");
search.addEventListener("change",()=>{
    searchValue=search.value.trim()
    if (searchValue.length) {

        let words=document.getElementById("rand-words");
        words.innerHTML="";

        randWord(searchValue)
    }
    else{
        genWords();
    }
})
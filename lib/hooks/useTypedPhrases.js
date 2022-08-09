import { useState, useEffect } from 'react';

/////////////////////////////// EXTRACT TO DIFFERENT PAGE FOR USETYPER HOOK.
const  TypingStage = {
    Typing: 0,
    Pausing: 1,
    Deleting: 2,
}

const Typing_interval = 40;
const Pausing_interval = 500;
const Deleting_interval = 10;

export const useTypedPhrases =  (typedPhraseArray,itterationCount) => {

    const shuffle = (arrayLenght) =>{
        // const reShuffle = (i) => {
        //     Math.floor(Math.random() *i)
        // }
        let nextIndex = Math.floor(Math.random() *arrayLenght +1)
        // while (nextIndex == currentIndex) {
        //     nextIndex = reShuffle(nextIndex)
        //     }
        return nextIndex;
    };
    

    const[selectedIndex,setSelectedIndex ] = useState(0)
    const  [phase, setPhase] = useState(TypingStage.Typing)
    let [typedPhrase, setTypedPhrase] = useState('');
    let [internalItterationCount, setInternalItterationCount] = useState(0);

    useEffect(() => {
        switch(phase){
            case TypingStage.Typing:{

                const nextTypedPhrase = typedPhraseArray[selectedIndex].slice(0,typedPhrase.length +1)
                if (nextTypedPhrase == typedPhrase) {
                    if(internalItterationCount >= itterationCount)return // check for itterationCount
                    setInternalItterationCount(internalItterationCount + 1)
                    setPhase(TypingStage.Pausing)
                    return
                }
              const timeout = setTimeout(()=>{
                setTypedPhrase(nextTypedPhrase)}, Typing_interval)
            
              return () => clearTimeout(timeout)
            }

            case TypingStage.Deleting:{
                if (!typedPhrase) {
                    // let nextIndex = shuffle(typedPhraseArray.length,selectedIndex);
                    let nextIndex = shuffle(typedPhraseArray.length);
                    setSelectedIndex(typedPhraseArray[nextIndex] ? nextIndex : 0 )
                    setPhase(TypingStage.Typing)
                    return
                }
                const nextTextsToDelete = typedPhraseArray[selectedIndex].slice(0,typedPhrase.length -1)

              const timeout = setTimeout(()=>{
                setTypedPhrase(nextTextsToDelete)}, Deleting_interval)
            
              return () => clearTimeout(timeout)
            }
            case TypingStage.Pausing:
                const timeout = setTimeout(()=>{
                    setPhase(TypingStage.Deleting)
        
                      }, Pausing_interval)
                    return () => clearTimeout(timeout)

        }


        // if (phase == TypingStage.Pausing) return

        
      
    }, [typedPhraseArray,typedPhrase,selectedIndex, phase, internalItterationCount, itterationCount])

    return typedPhrase
    

}
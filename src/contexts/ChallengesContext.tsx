import { createContext , useState , ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

//Dados que recebo
interface ChallengesProviderProps{
    children : ReactNode,
}

interface Challenge{
    type : string,
    description : string,
    amount : number,
}

//Dados que retorno
interface ChallengesContextData{
    level : number,
    levelUp : () => void,
    currentExperience :number,
    challengesCompleted : number,
    startNewChallenges : () => void;
    activeChallenge : Challenge;
    resetChallenge : () => void;
    experienceToNextLevel : number,
    completeChallenge : () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children } : ChallengesProviderProps) {

    const [level,setLevel] = useState(1);
    const [currentExperience,setCurrentExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState<number>(0);
    const [activeChallenge,setActiveChallenge] = useState<Challenge>();
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    const levelUp = () => {
        setLevel(level+1);
    }

    const startNewChallenges = () =>{
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio',{
                body : `Valendo ${challenge.amount} xp`
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    const completeChallenge = () => {
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalXp = currentExperience + amount;

        if(finalXp >= experienceToNextLevel){
            finalXp = finalXp - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalXp);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
    }

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    return (
        <ChallengesContext.Provider 
        value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenges,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge
        }}
        >
            {children}
        </ChallengesContext.Provider>
    )

} 
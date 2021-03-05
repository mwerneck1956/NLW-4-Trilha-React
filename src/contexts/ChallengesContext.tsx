import { createContext , useState , ReactNode } from 'react';
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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children } : ChallengesProviderProps) {

    const [level,setLevel] = useState(1);
    const [currentExperience,setCurrentExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState();
    const [activeChallenge,setActiveChallenge] = useState<Challenge>();
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    const levelUp = () => {
        setLevel(level+1);
    }

    const startNewChallenges = () =>{
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

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
            experienceToNextLevel
        }}
        >
            {children}
        </ChallengesContext.Provider>
    )

} 
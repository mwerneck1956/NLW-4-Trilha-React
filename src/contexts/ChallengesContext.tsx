import { createContext , useState , ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

//Dados que recebo
interface ChallengesProviderProps{
    children : ReactNode,
    level : number,
    currentExperience : number,
    challengesCompleted : number
  
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
    closeLevelUpModal : () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest } : ChallengesProviderProps) {

    const [level,setLevel] = useState(rest.level || 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengesCompleted,setChallengesCompleted] = useState<number>(rest.challengesCompleted || 0);
    const [activeChallenge,setActiveChallenge] = useState<Challenge>();
    const [isLevelUpModalOpen,setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    useEffect(()=>{
        Cookies.set('level',level.toString())
        Cookies.set('currentExperience',currentExperience.toString())
        Cookies.set('challengesCompleted',challengesCompleted.toString())
        
    },[level,currentExperience,challengesCompleted])


    const levelUp = () => {
        setLevel(level+1);
        setIsLevelUpModalOpen(true);
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

    const closeLevelUpModal = () => {
        setIsLevelUpModalOpen(false);
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
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
        }}
        >
            {children}
           {isLevelUpModalOpen &&  <LevelUpModal/> }
        </ChallengesContext.Provider>
    )

} 
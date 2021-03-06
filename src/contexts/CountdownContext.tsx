import { createContext , ReactNode , useContext , useState , useEffect} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData{
    minutes : number,
    seconds : number,
    hasFinished : boolean,
    isActive : boolean,
    startCountdown : () => void,
    resetCountdown : () => void,
}


interface CountdownProviderProps{
    children : ReactNode,
}


let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children} : CountdownProviderProps){

    const {startNewChallenges} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    //Arrendoda minutos para inteiro
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    
    const startCountdown = () => {
        setIsActive(true);
    }

    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenges();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider 
          value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
          }}>
            {children}
        </CountdownContext.Provider>
    )
}
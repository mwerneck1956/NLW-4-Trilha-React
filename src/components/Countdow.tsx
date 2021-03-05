import { useState, useEffect , useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'


let countdownTimeout: NodeJS.Timeout;

export function Countdown() {


    const {startNewChallenges} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    //Arrendoda minutos para inteiro
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //Preenche com 0 começando da esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    const startCountdown = () => {
        setIsActive(true);
    }

    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
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

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight} </span>
                </div>
                <span> : </span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ?
                <button
                    disabled
                    type="button"
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
                :
                <>
                    {!isActive ?
                        <button
                            onClick={startCountdown}
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        >
                            Iniciar um ciclo
                        </button>
                        :
                        <button
                            onClick={resetCountdown}
                            type="button"
                            className={styles.countdownButton}
                        >
                            Abandonar o ciclo
                      </button>
                    }
                </>
            }
        </div>

    )
}
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){

    const hasActiveChallenge = true;

    const {activeChallenge , resetChallenge , completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext)


    const handleChallengeSucceeded = () => {
        completeChallenge();
        resetCountdown();
    }

    const handleChallengeFailed = () => {
        resetChallenge();
        resetCountdown();
    }

    const activeChallengeContent = () => (
        <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
                <img src={`icons/${activeChallenge.type}.svg`} alt="Level Up" />
                <strong>Novo desafio</strong>
                <p>{activeChallenge.description}</p>
            </main>
            <footer>
                <button
                    type="button"
                    className={styles.challengeFailedButton}
                    onClick={handleChallengeFailed}
                >
                    Falhei
                </button>
                <button 
                    type="button"
                    className={styles.challengeSucceededButton}
                    onClick={handleChallengeSucceeded}
                >
                    Completei
                </button>
            </footer>
        </div>
    )
    
    const notActiveChallengeContent = () => (
        <div className={styles.challengeNotActive}>
            <strong>
                Finalize um ciclo para receber um desafio
        </strong>
            <p>
                <img src="icons/level-up.svg" alt="Level Up" />
                Avançe de level completando desafios
            </p>
        </div>
    )
    

    return(
        <div className={styles.challengeBoxContainer}>
           {activeChallenge ? activeChallengeContent() : notActiveChallengeContent()}
        </div>
    )
} 
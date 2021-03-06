import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){

    const {level} = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}> 
            <img src="https://avatars.githubusercontent.com/u/39034478?s=400&u=a72e9bae89ca71ef57b3fddd68f0fe0b0c8eadcb&v=4" alt="Matheus Werneck"/>
            <div>
                <strong>
                    Matheus Werneck
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Matheus"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}
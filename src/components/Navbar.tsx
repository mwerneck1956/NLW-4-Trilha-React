import styles from '../styles/components/Navbar.module.css'

export function Navbar() {

    return (
        <nav className={styles.container}>

            <div className={styles.logoContainer}>
                <img className={styles.logo} src="icons/logo.svg" />
            </div>

            <ul className={styles.navItemsContainer}>
                <li className={styles.navItemsContainer}>
                    <a>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12L16 2.66663L28 12V26.6666C28 27.3739 27.719 28.0522 27.219 28.5522C26.7189 29.0523 26.0406 29.3333 25.3333 29.3333H6.66667C5.95942 29.3333 5.28115 29.0523 4.78105 28.5522C4.28095 28.0522 4 27.3739 4 26.6666V12Z" 
                                  stroke="#5965E0" 
                                  stroke-width="2.5" 
                                  stroke-linecap="round" 
                                  stroke-linejoin="round" 
                            />
                            <path d="M12 29.3333V16H20V29.3333" stroke="#5965E0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </a>


                    <a>
                        <img src="icons/award.svg" />
                    </a>

                </li>

            </ul>
        </nav>
    )
}


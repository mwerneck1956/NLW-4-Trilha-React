import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdow';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'



import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from '../components/ChallengeBox';
import {CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { Navbar } from '../components/Navbar';


interface HomeProps{
  level : number,
  currentExperience : number,
  challengesCompleted : number
}

export default function Home(props : HomeProps) {
  return (
  <ChallengesProvider 
    level ={props.level} 
    currentExperience = {props.currentExperience} 
    challengesCompleted = {props.challengesCompleted}
  >
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>
      <ExperienceBar />
      <Navbar/>
      <CountdownProvider> 
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
    </div>
  </ChallengesProvider>
  )
}

export const getServerSideProps : GetServerSideProps = async(context) => {

  const {level,currentExperience,challengesCompleted} = context.req.cookies;

  return{
    props : {
      level : Number(level),
      currentExperience : Number(currentExperience),
      challengesCompleted : Number(challengesCompleted)
    }
  }
}
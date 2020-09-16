import React, { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const CountDown = dynamic(
  () => import('react-countdown-clock'),
  { ssr:false }
)
const CountDownTest =({tournament})=> {
  const [completions, setCompletions] = useState(0)
  const [startingTime, setStartingTime] = useState(60)
  const {dbh} = useContext(FirebaseActionContext);

  const onComplete = () => {
    const timestamp = Date.now();
    dbh.collection('tournaments').doc(tournament.id).update({previousPickTime:timestamp})
    // // this.setState(
    // //   {
    // //     completions: this.state.completions + 1
    // //   },
    // //   () => console.log('completions', this.state.completions)
    // // )
    // console.log("RESTARTING")
  }

  useEffect(() => {
    console.log(tournament)
    setCompletions(tournament.previousPickTime);
    const endTime = tournament.previousPickTime + 60000;
    const currentTimeRemaining = (endTime - Date.now()) / 1000;
    if(endTime > 0) {
      setStartingTime(currentTimeRemaining);
    }
  }, [tournament.previousPickTime])


    return (
      <div className='mx-auto text-center flex flex-row items-center justify-center'>
        <CountDown
          key={completions}
          seconds={startingTime}
          color="#e63946"
          alpha={1}
          size={200}
          onComplete={onComplete}
          font="Orbitron"
          fontSize="30px"
        />
      </div>
    )

}

export default CountDownTest

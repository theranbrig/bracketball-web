import React, { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const CountDown = dynamic(
  () => import('react-countdown-clock'),
  { ssr:false }
)
const Timer =({tournament, user, currentPick, makePick, loading})=> {
  const [completions, setCompletions] = useState(0)
  const [startingTime, setStartingTime] = useState(60)
  const {dbh} = useContext(FirebaseActionContext);

  const onComplete = () => {
    const timestamp = Date.now();
    if(user.role === 'OWNER') {
      dbh.collection('tournaments').doc(tournament.id).update({previousPickTime:timestamp})
      makePick(currentPick.id, currentPick.username)
    }
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
    const currentTimeRemaining = (6000000 - (Date.now() - tournament.previousPickTime)) / 1000;
    if(currentTimeRemaining > 0) {
      setStartingTime(currentTimeRemaining);
    }
  }, [tournament.previousPickTime])


    return (
      <div className='mx-auto text-center flex flex-col items-center justify-center relative'>
        {/* <button onClick={onComplete}>Button</button> */}
        <h3 className="text-2xl text-prussian mb-4">Time Remaining</h3>
        <div className="relative block">
          {startingTime >= 0 && tournament.currentPick <= tournament.picks.length || !loading? (
            <CountDown
            key={tournament.previousPickTime}
            seconds={startingTime}
            color="#e63946"
            alpha={1}
            size={200}
            onComplete={onComplete}
            font="Orbitron"
            fontSize="30px"
            />
            ): null}
        </div>
      </div>
    )

}

export default Timer

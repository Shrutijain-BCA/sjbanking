"use client"
import CountUp from 'react-countup'
const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className="animated-counter text-3xl font-bold w-full">
      <CountUp 
        prefix="INR "
        suffix=""
        end={amount} 
        decimals={2}
        duration={2}
        />
    </div>
  )
}

export default AnimatedCounter

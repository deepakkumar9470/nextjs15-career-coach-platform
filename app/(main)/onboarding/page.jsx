import React from 'react'
import { industries } from '../../../data/industries'
import { getUserOnboardingStatus } from '../../../actions/user'
import { redirect } from 'next/navigation'
import OnBoardingForm from './_components/OnBoardingForm'

const OnboardingPage = async () => {
  const {isOnboarded} = await getUserOnboardingStatus()
  if(isOnboarded) 
  {
    redirect("/dashboard")
  }
  return (
    <div>
      <OnBoardingForm industries={industries}/>
    </div>
  )
}

export default OnboardingPage

import React from 'react'
import {getUserOnboardingStatus} from "../../../actions/user"
import {getIndustryInsights} from "../../../actions/dashboard"

import { redirect } from 'next/navigation'
import DashBoardView from './_components/dashboard-view'
const IndustryInsightsPage = async() => {
  const {isOnboarded} = await getUserOnboardingStatus();

  const insights = await getIndustryInsights();
  if(!isOnboarded) redirect("/onboarding")

  return (
    <div>
      <DashBoardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage

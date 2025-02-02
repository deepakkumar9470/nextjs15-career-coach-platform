"use server";
import {auth} from "@clerk/nextjs/server"
import {db} from "../lib/inngest/prisma";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
   const {userId} = await auth() 
   if(!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where:{
            clerkUserId: userId
        },
    });

    if(!user) throw new Error("User not found");
    try {
        const result = await db.$transaction(
            async (tx)=>{
                let industryInsights = await tx.industryInsight.findUnique({
                    where:{
                        industry: data.industry
                    },
                }); 

                if(!industryInsights){
                    const insights = await generateAIInsights(data.industry);
                    industryInsights = await db.industryInsight.create({
                        data : {
                            industry : data.industry,
                            ...insights,
                            nextUpdate  : new Date(Date.now()+ 7 * 24 * 6 * 60 * 1000)
                        }
                    })
                
                }

                // update user
                const updateUser = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio : data.bio,
                        skills: data.skills,
                        
                    },
                });

              return {updateUser,industryInsights};
            },
            {
                timeout : 10000,
            }

    );
     return {success : true,...result};
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to update profile"+error.message)
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth() 
    if(!userId) throw new Error("Unauthorized")
 
     const user = await db.user.findUnique({
         where:{
             clerkUserId: userId
         },
     });
 
     if(!user) throw new Error("User not found");
    
     try {
        const user = await db.user.findUnique({
            where:{
                clerkUserId: userId
            },
            select : {
                industry : true
            }
        });
        return {
            isOnboarded :  !!user?.industry,
        }
     } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status")
     }
}
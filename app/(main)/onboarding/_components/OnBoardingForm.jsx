"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "../../../../lib/schema";
import { useRouter } from "next/navigation";

import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import useFetch  from "../../../../hooks/use-fetch";
import {updateUser} from "../../../../actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const OnBoardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    data: updateResult,
    loading: updateLoading,
    fn:updateUserFn ,
  } = useFetch(updateUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const watchIndustry = watch("industry")

  const onSubmit =async(values)=>{
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "_")
      }`

      await updateUserFn({
        ...values,
        industry: formattedIndustry
      })
    } catch (error) {
      throw new Error("Onboarding error")
    }
  }

  useEffect(()=>{
    if(updateResult?.success && !updateLoading){
      toast.success("Profile Completed Successfully")
      router.push("/dashboard");
      router.refresh()
    }

  },[updateResult,updateLoading])
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select
        onValueChange={(val)=>{
          setValue("industry",val);
        setSelectedIndustry( 
          industries.find(item=> item.id===val)
        );
        setValue("subIndustry",val);

        }}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select a industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Industry</SelectLabel>
              {
                industries.map((industry) => (
                  <SelectItem
                    key={industry.id}
                    value={industry.id}
                  >
                    {industry.name}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        {
          errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry.message}</p>
          )
        }
        </div>
          {watchIndustry && 
          (
          <div className="space-y-2">
        <Label htmlFor="subIndustry">Specialization</Label>

          <Select
          onValueChange={(val)=>setValue("subIndustry",val)}>
            <SelectTrigger id="subIndustry">
              <SelectValue placeholder="Select a subIndustry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub Industry</SelectLabel>
                {
                  selectedIndustry?.subIndustries.map((industry) => (
                    <SelectItem
                      key={industry}
                      value={industry}
                    >
                      {industry}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {
            errors.subIndustry && (
              <p className="text-red-500 text-sm">{errors.subIndustry.message}</p>
            )
          }
          </div>)
          }

<div className="space-y-2">
        <Label htmlFor="experience">Year of experience</Label>
        <Input
        id="experience"
        name="experience"
        type="number"
        min="0"
        max="50"
        placeholder="Select year of experience"
        {...register("experience")}
        />

          {
            errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience.message}</p>
            )
          }
          </div>

          <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input
        id="skills"
        name="skills"
        placeholder="e.g, Javascript,NextJS,ReactJS etc"
        {...register("skills")}
        />
        <p className="text-sm text-muted-foreground">Separate multiple skills with commas </p>

          {
            errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )
          }
          </div>

          <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
        id="bio"
        name="bio"
        className="h-32"
        placeholder="Tells us about your professional background"
        {...register("bio")}
        />

          {
            errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )
          }
          </div>
          <Button type="submit" className="w-full font-bold" disabled={updateLoading}>

            {
              updateLoading ? 
              <>
                  <Loader2 className="w-4 h-4 animate-spin"/>
                  Saving....
              </>
              :
              ("Complete Profile")
            }
            
          </Button>
          </form>
        </CardContent>

      </Card>
    </div>
  );
};

export default OnBoardingForm;

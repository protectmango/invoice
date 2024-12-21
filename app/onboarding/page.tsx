"use client"

import { SubmitButton } from "@/components/custom/SubmitButtons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { onBoardUser } from "../actions";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function Onboarding() {

    const [lastResult,action] = useActionState(onBoardUser,undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData,{
                schema: onboardingSchema,
            });
        },

        shouldValidate : "onBlur",
        shouldRevalidate : "onInput",
    })

    return (
        <div className="min-h-screen w-screen flex items-center justify-center ">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Your are almost finished!</CardTitle>
                    <CardDescription> Enter your information to create an Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form  className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
                        <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>First Name</Label>
                            <Input placeholder="Gulshan" name={fields.firstName.name} key={fields.firstName.key} defaultValue={fields.firstName.initialValue}/>
                            <p className="text-red-500 text-sm mx-2">{fields.firstName.errors}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Last Name</Label>
                            <Input placeholder="Rana" name={fields.lastName.name} key={fields.lastName.key} defaultValue={fields.lastName.initialValue}/>
                            <p className="text-red-500 text-sm mx-2">{fields.lastName.errors}</p>
                        </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input placeholder="123 Delhi" name={fields.address.name} key={fields.address.key} defaultValue={fields.address.initialValue}/>
                            <p className="text-red-500 text-sm mx-2">{fields.address.errors}</p>
                        </div>
                        <SubmitButton text="Finish Onboarding"/>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
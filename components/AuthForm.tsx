// import React from 'react'
"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    FieldGroup,
} from "@/components/ui/field"
// import { Input } from "./ui/input"
import { Button } from "./ui/button"
import FormController from "./FormController"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { signIn, signUp } from "@/lib/actions/user.action"
import {useRouter} from "next/navigation"

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formschema = authFormSchema(type);
    const router = useRouter();
    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
        },
    })

    async function onSubmit(data: z.infer<typeof authFormSchema>) {
        setIsLoading(true);
        try {
            if(type === "sign-up"){
                const newUser = await signUp(data);
                setUser(newUser);
                console.log("newuser: ", newUser);
            }
            if(type === "sign-in"){
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })

                console.log("Logged In user : ", response);
                
                if(response){
                    localStorage.setItem("user", JSON.stringify(response));
                    router.push("/")
                }
            }
        } catch (error) {
            console.log("Error");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <section className='auth-form'>
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="mb-12 cursor-pointer items-center gap-1 px-4 flex">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="SJ Banking Logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">SJ Banking</h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {
                            user ? "link account" : type === "sign-in" ? "Sign In" : "Sign Up"
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user ?
                            "Link your account to get started" : "Please enter your details"
                        }
                    </p>
                </div>
            </header>
            {
                user ? (
                    <div className="flex flex-col gap-4">
                        {/* If user existes then he or she have to link bank */}
                        {/* we will add plaid link here */}
                    </div>
                ) : (<>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}
                    // className="space-y-8"
                    >
                       <FieldGroup>
                         {
                            type == "sign-up" && (
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-between">
                                        <FormController
                                        control={form.control} name="firstName"
                                        placeholder="Enter Your firstName" label="First Name"
                                    />
                                    <FormController
                                        control={form.control} name="lastName"
                                        placeholder="Enter Your lastName" label="Last Name"
                                    />
                                    </div>
                                    <div className=" mt-5">
                                        <FormController
                                        control={form.control} name="address1"
                                        placeholder="Enter Your address" label="Address"
                                    />
                                    </div>
                                    <div className=" mt-5">
                                        <FormController
                                        control={form.control} name="city"
                                        placeholder="Enter Your city" label="City"
                                    />
                                    </div>
                                    <div className="flex flex-row justify-between mt-5">
                                        <FormController
                                        control={form.control} name="state"
                                        placeholder="Enter Your state" label="State"
                                    />
                                        <FormController
                                        control={form.control} name="postalCode"
                                        placeholder="Enter Your postalCode" label="Postal Code"
                                    />
                                    
                                    </div>

                                    <div className="flex flex-row justify-between mt-5">
                                    <FormController
                                        control={form.control} name="dateOfBirth"
                                        placeholder="Enter Your dob" label="Date Of Birth"
                                    />
                                    <FormController
                                        control={form.control} name="ssn"
                                        placeholder="Enter Your ssn" label="SSN"
                                    />
                                    </div>
                                </div>
                            )
                        }
                       </FieldGroup>

                        <FieldGroup className="mt-5">

                            <FormController
                                control={form.control} name="email"
                                placeholder="Enter Your email" label="Email"
                            />
                            <FormController
                                control={form.control} name="password"
                                placeholder="Enter Your Password" type="password" label="Password"
                            />
                        </FieldGroup>
                        <div className="flex flex-col gap-4">
                            <Button type="submit" form="form-rhf-demo" className="form-btn mt-4" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin"></Loader2>
                                        &nbsp; Loading...
                                    </>
                                ) : type === "sign-in" ? "sign In" : "sign Up"}
                            </Button>
                        </div>
                    </form>

                    <footer
                        className="flex justify-center gap-1"
                    >
                        <p className="text-14 font-normal text-gray-600">
                            {type === "sign-in"
                                ? "Don't have an account?" : "Already have an account"
                            }
                        </p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
                            {
                                type === "sign-in" ? "Sign Up" : "Sign In"
                            }
                        </Link>
                    </footer>
                </>)
            }
        </section>
    )
}

export default AuthForm

"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ResourceCreateDTO } from "@/interface/resource"
import { getAuth } from "@/lib/auth-actions"
import { navigationCreateResouceData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createResource } from "@/lib/services/resource-service"
import { useRouter } from "next/navigation" // Importar useRouter

export default function CreateResourceController() {
    const [session, setSession] = useState<any>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter() // Para redireccionar después de crear

    const form = useForm<ResourceCreateDTO>({
        defaultValues: {
            authorId: "",
            title: "",
            description: "",
            isPublic: false,
            attachment: "",
            image: "",
            type: "Text",
            areas: [],
            communities: [],
        },
    })

    const { handleSubmit, trigger, setValue } = form

    useEffect(() => {
        async function fetchSession() {
            const auth = await getAuth()
            setSession(auth)
            if (auth?.user?.id) {
                setValue("authorId", auth.user.id)
            }
        }
        fetchSession()
    }, [setValue])

    const StepComponent = navigationCreateResouceData[currentStep].component

    const nextStep = async () => {
        const stepFields = navigationCreateResouceData[currentStep].fieldsToValidate || []

        if (stepFields.length > 0) {
            const valid = await trigger(stepFields as any)
            if (!valid) return
        }

        if (currentStep < navigationCreateResouceData.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        if (currentStep !== navigationCreateResouceData.length - 1) {
            return;
        }

        setIsSubmitting(true)
        try {
            const filteredData = {
                ...data,
                areas: data.areas ? data.areas.filter(id => id !== "") : [],
                communities: data.communities ? data.communities.filter(id => id !== "") : []
            }

            await createResource(filteredData)

            //router.push("/resources?created=true")
        } catch (error) {
            console.error("Error creating resource:", error)
        } finally {
            setIsSubmitting(false)
        }
    })

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between items-center w-full h-full max-w-3xl p-4"
        >
            <div className="flex gap-2 mb-6 w-full justify-center sm:justify-start">
                {!session ? (
                    <div className="flex gap-2 w-full justify-center sm:justify-start">
                        {navigationCreateResouceData.map((step) => (
                            <Skeleton key={step.id} className="h-2 w-20 rounded-full" />
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-2 w-full justify-center sm:justify-start">
                        {navigationCreateResouceData.map((step, index) => (
                            <div
                                key={step.id}
                                className={`h-2 w-20 rounded-full ${index <= currentStep
                                    ? step.id === 5
                                        ? "bg-tiffany-blue"
                                        : "bg-persian-green"
                                    : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col h-full">
                {!session ? (
                    <div className="h-full w-full justify-center flex flex-col gap-4 mb-8">
                        <div className="flex flex-col  ">
                            <Skeleton className="w-80 h-8 mb-12  " />
                            <div className="flex flex-col gap-4">
                                <Skeleton className="w-full h-25" />
                                <Skeleton className="w-full h-25" />
                            </div>
                        </div>
                        <Skeleton className="w-22 h-15" />
                        <Skeleton className="w-40 h-8 " />
                    </div>
                ) : (
                    <StepComponent form={form} />
                )}
            </div>

            {!session ? (
                <div className=" w-full gap-4 flex flex-col sm:flex-row sm:justify-between">
                    <Skeleton className="h-9 w-full sm:w-16" />
                    <Skeleton className="h-9 w-full sm:w-22" />
                </div>
            ) : (
                <div className="flex flex-col-reverse gap-4 sm:flex sm:flex-row sm:justify-between w-full mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isSubmitting}
                    >
                        Atrás
                    </Button>

                    {currentStep === navigationCreateResouceData.length - 1 ? (
                        <Button
                            type="submit"
                            className="bg-persian-green"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Procesando..." : "Finalizar"}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="bg-persian-green"
                        >
                            Siguiente
                        </Button>
                    )}
                </div>
            )}
        </form>
    )
}
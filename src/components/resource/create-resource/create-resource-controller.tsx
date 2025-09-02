"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import StepBasicData from "./steps/step-basic-data"
import StepAttachment from "./steps/step-attachment"
import StepAreas from "./steps/step-areas"
import StepMyCommunities from "./steps/step-my-communities"
import StepSummary from "./steps/step-summary"
import { useState } from "react"


type ResourceData = {
    title: string
    description: string
    isPublic: boolean
    attachment?: File | string | null
    image?: File | null
    type: string,
    areas: string[]
    communities: string[]
}

const steps = [
    { id: 1, name: "basicData", component: StepBasicData },
    { id: 2, name: "attachment", component: StepAttachment },
    { id: 3, name: "areas", component: StepAreas },
    { id: 4, name: "myCommunities", component: StepMyCommunities },
    { id: 5, name: "summary", component: StepSummary }
]

export default function CreateResourceController() {
    const [currentStep, setCurrentStep] = useState(0)

    // Estado centralizado del recurso
    const [data, setData] = useState<ResourceData>({
        title: "",
        description: "",
        isPublic: false,
        attachment: null,
        image: null,
        type: "",
        areas: [],
        communities: [],
    })

    const StepComponent = steps[currentStep].component

    const updateData = (newData: Partial<ResourceData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="flex flex-col justify-between items-center w-full h-full max-w-3xl p-4">
            <div className="flex gap-2 mb-6  sm:w-full ">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={` h-2 w-20 rounded-full ${index <= currentStep ? step.id === 5 ? "bg-tiffany-blue" : "bg-persian-green" : "bg-muted"
                            }`}
                    />
                ))}
            </div>

            <div className="w-full flex flex-col h-full">
                <StepComponent data={data} onUpdate={updateData} />
            </div>

            <div className="flex flex-col-reverse gap-4 sm:flex sm:flex-row sm:justify-between  w-full mt-6">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    Atrás
                </Button>
                <Button onClick={nextStep} className="bg-persian-green">
                    {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </Button>
            </div>
            {/* <ModeToggle />*/}
        </div>
    )
}

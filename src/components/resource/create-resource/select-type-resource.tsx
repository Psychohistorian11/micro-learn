"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  value?: string
  onChange: (val: string) => void
}

export function SelectTypeResource({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="">
        <SelectValue placeholder="Selecciona un tipo de recurso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos</SelectLabel>
          <SelectItem value="Video">Video</SelectItem>
          <SelectItem value="Podcast">Podcast</SelectItem>
          <SelectItem value="Slides">Diapositivas</SelectItem>
          <SelectItem value="Infography">Infografía</SelectItem>
          <SelectItem value="Text">Texto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

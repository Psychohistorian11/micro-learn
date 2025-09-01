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
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="podcast">Podcast</SelectItem>
          <SelectItem value="article">Artículo</SelectItem>
          <SelectItem value="slides">Presentación</SelectItem>
          <SelectItem value="other">Otro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

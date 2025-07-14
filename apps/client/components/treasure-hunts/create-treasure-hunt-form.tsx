import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"

import { CreateTreasureHunt } from "@pe/schemas"
import type { CreateTreasureHuntInput } from "@pe/types"

import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/input/form-field"
import { Switch } from "@/components/ui/switch"
import apiClient from "@/services/api/apiClient"

const CreateTreasureHuntForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
      numberOfPlayers: 0,
      endDate: null,
      latitude: 0,
      longitude: 0,
    },
    resolver: zodResolver(CreateTreasureHunt),
  })
  const [useEndDate, setUseEndDate] = useState(false)
  const date = watch("endDate") ?? new Date()

  const onSubmit = async (data: CreateTreasureHuntInput) => {
    await apiClient.post("/treasure-hunts", data)
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setValue("endDate", selectedDate ?? null)
  }

  return (
    <View className="gap-4 items-center justify-center rounded-lg w-full">
      <FormField control={control} name="title" label="Title" />
      <FormField control={control} name="description" label="Description" />
      <FormField
        control={control}
        name="latitude"
        label="Latitude"
        keyboardType="numeric"
      />
      <FormField
        control={control}
        name="longitude"
        label="Longitude"
        keyboardType="numeric"
      />
      <FormField
        control={control}
        name="numberOfPlayers"
        label="Numbers of players (0 = unlimited)"
        keyboardType="numeric"
      />
      <Switch
        onValueChange={(value) => setValue("isPublic", value)}
        value={watch("isPublic")}
        leftText="Private"
        rightText="Public"
      />

      <Switch
        onValueChange={(value) => {
          setUseEndDate(value)
          setValue("endDate", value ? new Date() : null)
        }}
        value={useEndDate}
        rightText="Use end date"
      />
      {useEndDate && (
        <DateTimePicker value={date} mode={"date"} onChange={onChange} />
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default CreateTreasureHuntForm

import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"

import { CreateTreasureHunt } from "@pe/schemas"
import type { CreateTreasureHuntInput } from "@pe/types"

import { useTheme } from "@/components/contexts/theme-context"
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
      worldType: "real",
      numberOfPlayers: 0,
      endDate: null,
    },
    resolver: zodResolver(CreateTreasureHunt),
  })
  const { tw } = useTheme()
  const [useEndDate, setUseEndDate] = useState(false)
  const date = watch("endDate") ?? new Date()

  const onSubmit = async (data: CreateTreasureHuntInput) => {
    await apiClient.post("/treasure-hunts", data)
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setValue("endDate", selectedDate ?? null)
  }

  return (
    <View
      style={tw.style("gap-4 items-center justify-center rounded-lg w-full")}
    >
      <FormField control={control} name="title" label="Title" />
      <FormField control={control} name="description" label="Description" />
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
        onValueChange={(value) =>
          setValue("worldType", value ? "cartographic" : "real")
        }
        value={watch("worldType") === "cartographic"}
        leftText="Real"
        rightText="Cartographic"
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
      <Button isText onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  )
}

export default CreateTreasureHuntForm

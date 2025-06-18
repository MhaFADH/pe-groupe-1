import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { View } from "react-native"

import { CreateTreasureHunt } from "@pe/schemas"
import type { CreateTreasureHuntInput } from "@pe/types"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/input"

const CreateTreasureHuntForm = () => {
  const { control, handleSubmit } = useForm<CreateTreasureHuntInput>({
    defaultValues: {
      title: "",
      description: "",
      endDate: "",
      isPublic: true,
      worldType: "real",
      numberOfPlayers: "",
    },
    resolver: zodResolver(CreateTreasureHunt),
  })

  const onSubmit = (data: CreateTreasureHuntInput) => {
    console.log("Form submitted", data)
  }

  // TODO: add checkbox fields -> react-native-bouncy-checkbox
  // TODO: add date picker for endDate -> @react-native-community/datetimepicker

  return (
    <View>
      <FormField control={control} name="title" />
      <FormField control={control} name="description" />
      <FormField control={control} name="numberOfPlayers" />
      <Button isText onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  )
}

export default CreateTreasureHuntForm

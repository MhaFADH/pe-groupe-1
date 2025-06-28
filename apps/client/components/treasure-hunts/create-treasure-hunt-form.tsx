import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { View } from "react-native"

import { CreateTreasureHunt } from "@pe/schemas"
import type { CreateTreasureHuntInput } from "@pe/types"

import { useTheme } from "@/components/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const CreateTreasureHuntForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
      worldType: "real",
      numberOfPlayers: 0,
    },
    resolver: zodResolver(CreateTreasureHunt),
  })
  const { tw } = useTheme()

  const onSubmit = (data: CreateTreasureHuntInput) => {
    console.log("Form submitted", data)
  }

  // TODO: add date picker for endDate -> @react-native-community/datetimepicker

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
      <Button isText onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  )
}

export default CreateTreasureHuntForm

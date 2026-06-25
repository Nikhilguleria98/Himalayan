import React from "react"
import { Button } from "../ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { PlusCircle, Trash2 } from "lucide-react"
import { useFieldArray } from "react-hook-form"

export function ItineraryFieldArray({ name, control, form }) {
  const {
    fields: days,
    append,
    remove
  } = useFieldArray({
    name,
    control
  })

  const addDay = () => {
    append({
      day: days.length + 1,
      Title: "",
      todayActivities: [""],
      Note: "",
      Highlight: ""
    })
  }

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Itinerary</h3>
        <Button type="button" variant="outline" size="sm" onClick={addDay}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </div>

      {days.map((day, dayIndex) => (
        <div key={day.id} className="space-y-4 border p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Day {dayIndex + 1}</h4>
            {dayIndex > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newDays = [...days]
                  remove(dayIndex)
                  newDays.forEach((item, i) => {
                    if (i >= dayIndex) {
                      form.setValue(`${name}.${i}.day`, i + 1)
                    }
                  })
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Day
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={control}
              name={`${name}.${dayIndex}.Title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter day title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="font-medium text-sm">Today's Activities</div>
              <ActivitiesFieldArray
                name={`${name}.${dayIndex}.todayActivities`}
                control={control}
                form={form}
              />
            </div>

            <FormField
              control={control}
              name={`${name}.${dayIndex}.Note`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter note for this day" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`${name}.${dayIndex}.Highlight`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter day highlight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      {days.length === 0 && (
        <div className="text-center p-4 border border-dashed rounded-md">
          <p className="text-muted-foreground">No days added yet</p>
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addDay}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </div>
      )}
    </div>
  )
}

function ActivitiesFieldArray({ name, control }) {
  const {
    fields: activities,
    append,
    remove
  } = useFieldArray({
    name,
    control
  })

  return (
    <div className="space-y-2">
      {activities.map((activity, activityIndex) => (
        <div key={activity.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`${name}.${activityIndex}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter activity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => append("")}
          >
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Add activity</span>
          </Button>
          {activityIndex > 0 && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(activityIndex)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove activity</span>
            </Button>
          )}
        </div>
      ))}

      {activities.length === 0 && (
        <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      )}
    </div>
  )
}

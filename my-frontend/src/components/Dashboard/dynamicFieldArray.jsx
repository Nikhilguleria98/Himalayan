import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export function DynamicFieldArray({
  name,
  control,
  form,
  label,
  addButtonText = "Add Item",
  fields = [{ name: "text", label: "Text", type: "input" }],
}) {
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    name,
    control,
  });

  const addItem = () => {
    const newItem = {};
    fields.forEach((field) => {
      newItem[field.name] = "";
    });
    append(newItem);
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{label}</h3>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      </div>

      {items.map((item, index) => (
        <div key={item.id} className="space-y-4 border p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {label} {index + 1}
            </h4>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <div
            className={`grid grid-cols-1 gap-4 ${
              fields.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {fields.map((field) => (
              <FormField
                key={`${name}.${index}.${field.name}`}
                control={control}
                name={`${name}.${index}.${field.name}`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          {...formField}
                        />
                      ) : (
                        <Input
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center p-4 border border-dashed rounded-md">
          <p className="text-muted-foreground">
            No {label.toLowerCase()} added yet
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addItem}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}

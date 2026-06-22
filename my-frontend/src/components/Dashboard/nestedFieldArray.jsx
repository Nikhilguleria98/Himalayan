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

export function NestedFieldArray({
  name,
  control,
  form,
  label,
  titleField = "title",
  nestedArrayName = "multipleWays",
  nestedFields = [
    { name: "medium", label: "Medium", type: "input" },
    { name: "desc", label: "Description", type: "textarea" },
  ],
  addButtonText = "Add Item",
  itemLabel = "Item",
}) {
  const titlePath = `${name}.${titleField}`;
  const nestedPath = `${name}.${nestedArrayName}`;

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    name: nestedPath,
    control,
  });

  const addItem = () => {
    const newItem = {};
    nestedFields.forEach((field) => {
      newItem[field.name] = "";
    });
    append(newItem);
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <h3 className="text-lg font-medium">{label}</h3>

      <FormField
        control={control}
        name={titlePath}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{itemLabel}s</h4>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={item.id} className="space-y-4 border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">
                {itemLabel} {index + 1}
              </h5>
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

            {nestedFields.map((field) => (
              <FormField
                key={`${nestedPath}.${index}.${field.name}`}
                control={control}
                name={`${nestedPath}.${index}.${field.name}`}
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
        ))}

        {items.length === 0 && (
          <div className="text-center p-4 border border-dashed rounded-md">
            <p className="text-muted-foreground">
              No {itemLabel.toLowerCase()}s added yet
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
    </div>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const items = [
  {
    id: "coming",
    label: "Coming",
  },
  {
    id: "live",
    label: "Live",
  },
  {
    id: "end",
    label: "End",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function Fillter_CheckBox() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["coming", "live"],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormItem>
            {items.map((item) => (
              <FormControl key={item.id}>
                <Checkbox
                  id={item.id}
                  checked={form.watch("items").includes(item.id)}
                  onCheckedChange={(checked) => {
                    const updatedItems = checked
                      ? [...form.getValues("items"), item.id]
                      : form
                          .getValues("items")
                          .filter((value: string) => value !== item.id);
                    form.setValue("items", updatedItems);
                    form.handleSubmit(onSubmit)();
                  }}
                />
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormControl>
            ))}
          </FormItem>
        </div>
      </form>
    </Form>
  );
}

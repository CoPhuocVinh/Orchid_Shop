"use client";
import { parse } from "date-fns";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { startTransition, useState } from "react";
import { updateUserInfo } from "@/lib/actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface PersonalInfoFromProp {
  user: any;
}
function PersonalInfoFrom({ user }: PersonalInfoFromProp) {
  const { update, data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  const updateInfoSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    dob: z.date(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    image_url: z
      .string()
      .min(1, { message: "Please upload at least one image" }),
  });

  const form = useForm<z.infer<typeof updateInfoSchema>>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      dob: parse(user.dob, "do-MM-yyyy", new Date()),
      gender: user.gender || "MALE",
      image_url: user.img || "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateInfoSchema>) => {
    const dobFormat = values.dob
      ? new Date(values.dob).toISOString().replace("Z", "")
      : undefined;

    const formData = { ...values, dob: dobFormat };
    startTransition(() => {
      updateUserInfo(user.id as string, formData)
        .then((data) => {
          if (data.success) {
            update({
              ...session,
              user: {
                ...values,
                img: values.image_url
              },
            });
            toast.success("cập nhật thông tin thành công");
          } else {
            toast.error("cập nhật thông tin thất bại");
          }
        })
        .catch(() => toast.error("Có lỗi xảy ra"));
    });
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="2xl:col-span-12 xl:col-span-7">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Personal Informations
      </h3>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <ImageUploadOne
                        value={field.value}
                        disabled={isLoading}
                        onChange={(imageUrl) => field.onChange(imageUrl)}
                        onRemove={() => field.onChange(null)}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-yellow-300" />
                  </FormItem>
                )}
              />
              <div className="md:grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Giới tính"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            <span>{gender.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-yellow-300" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
              >
                Save Profile
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default PersonalInfoFrom;

"use client";
import React, { startTransition, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { parse } from "date-fns";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
import { updateUserInfo } from "@/lib/actions";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/date-time-picker/date-time-picker";

const MyProfileForm = () => {
  const { data: session, update } = useSession();

  const formatUser = {
    id: session?.user.id,
    name: session?.user.name,
    email: session?.user.email,
    image_url: session?.user.img,
    gender: session?.user.gender,
    dob: session?.user.dob ? format(session?.user.dob, "do-M-yyyy") : "",
  };

  console.log(formatUser)

  const genderOptions = [
    { label: "Nam", value: "MALE" },
    { label: "Nữ", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  const ProfileSchema = z.object({
    image_url: z
      .string()
      .min(1, { message: "Please upload at least one image" }),
    name: z.string().min(2),
    dob: z.date(),
    gender: z.string(),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: formatUser.email,
      name: formatUser.name,
      dob: parse(formatUser.dob, "do-MM-yyyy", new Date()),
      gender: formatUser.gender || "MALE",
      image_url: formatUser.image_url || "",
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    const dobFormat = values.dob
      ? new Date(values.dob).toISOString().replace("Z", "")
      : undefined;

    const formData = { ...values, dob: dobFormat };

    startTransition(() => {
      updateUserInfo(formatUser.id as string, formData)
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-8 max-w-3xl p-8 bg-white rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <ImageUploadOne
                  value={field.value}
                  // disabled={isLoading}
                  onChange={(imageUrl) => field.onChange(imageUrl)}
                  onRemove={() => field.onChange(null)}
                />
              </FormControl>
              <FormMessage className="dark:text-yellow-300" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên của bạn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="w-full px-4 py-2 border rounded-md"
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
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="dob">Chỉnh sửa năm sinh</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="minute"
                  jsDate={field.value ? new Date(field.value) : null}
                  onJsDateChange={field.onChange}
                  aria-label="Time Field"
                  // isDisabled={
                  //   field.value && new Date(field.value) < new Date()
                  // }
                />
              </FormControl>
              <FormMessage className="dark:text-yellow-300" />
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full px-4 py-2 border rounded-md">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender.value} value={gender.value}>
                          <span>{gender.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </Form>
  );
};

export default MyProfileForm;

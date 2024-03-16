'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from "date-fns";
import * as React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DateTimePicker } from '@/components/date-time-picker/date-time-picker';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
  datetime: z.date().nullable(),
});

const DEFAULT_VALUE = {
  datetime: null,
};

const DatetimePickerForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = React.useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
  //   setLoading(true);
console.log(data)
// here is data  {datetime: Sun Feb 04 2024 00:30:00 GMT+0700 (Indochina Time)}
// const formattedDatetime = data.datetime ? new Date(data.datetime).toISOString() : null;
const formattedDatetime = data.datetime ? new Date(data.datetime).toISOString().replace('Z', '') : null;

console.log(formattedDatetime)
  //   setTimeout(() => {
  //     setLoading(false);
  //     toast({
  //       title: 'Your submitted data',
  //       description: (
  //         <>
  //           <p className="text-red-600">
  //             It is a <InlineCode>Date</InlineCode> object, the{' '}
  //             <InlineCode>JSON.stringify</InlineCode> will show 0+ timezone. You need to parse to
  //             your timezone to match your needs.
  //           </p>
  //           <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //           </pre>
  //         </>
  //       ),
  //     });
  //   }, 500);
  // }
  }

  return (
    <main className="w-full h-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] ">
    <div className="gap-3 lg:gap-4 xl:gap-6">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="minute"
                  jsDate={field.value}
                  onJsDateChange={field.onChange}
                  aria-label="Time Field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"action"}>
          Submit
        </Button>
      </form>
    </Form>
    </div>
    </main>
  );
};
export default DatetimePickerForm;

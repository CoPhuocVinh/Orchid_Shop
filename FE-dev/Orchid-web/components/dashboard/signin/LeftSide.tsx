"use client";

import Link from "next/link";

import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";

function LeftSide() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false); // State để theo dõi việc ẩn/hiện mật khẩu

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    try {
      // Use startTransition to indicate a low-priority update
      startTransition(() => {
        signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl,
        })
          .then((res) => {
            if (!res?.error) {
              router.push(callbackUrl);
              // window.location.href = callbackUrl;
              toast.success("Đăng nhập thành công");
              form.reset();
            } else {
              toast.error("Tên đăng nhập hoặc mật khẩu sai");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Có lỗi xảy ra rồi");
          });
      });
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra rồi");
    }
  };

  const handleLoginProvider = async () => {
    await signIn("google", { callbackUrl })
      // .then(() => toast.success("Login success"))
      // .catch(() => toast.error("Login fail"));
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
      <header>
        <Link
          href="/"
          className="flex items-center font-bold dark:text-blue-200  "
        >
          <Image
            alt="logo"
            src="/images/logo.svg"
            height={40}
            width={40}
            priority={true}
            className=""
          />
          <span className="text-2xl ml-2 font-bold">Orchid</span>
        </Link>
      </header>
      <div className="max-w-[450px] m-auto pt-24 pb-16">
        <header className="text-center mb-8">
          <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
            Sign in to Bankco.
          </h2>
          <p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50">
            Send, spend and save smarter
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="#"
            className="inline-flex justify-center items-center gap-x-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg px-6 py-4 text-base text-bgray-900 dark:text-white font-medium"
          >
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8758 11.2137C20.8758 10.4224 20.8103 9.84485 20.6685 9.24597H11.4473V12.8179H16.8599C16.7508 13.7055 16.1615 15.0424 14.852 15.9406L14.8336 16.0602L17.7492 18.2737L17.9512 18.2935C19.8063 16.6144 20.8758 14.144 20.8758 11.2137Z"
                fill="#4285F4"
              />
              <path
                d="M11.4467 20.625C14.0984 20.625 16.3245 19.7694 17.9506 18.2936L14.8514 15.9408C14.022 16.5076 12.9089 16.9033 11.4467 16.9033C8.84946 16.9033 6.64512 15.2243 5.85933 12.9036L5.74415 12.9131L2.7125 15.2125L2.67285 15.3205C4.28791 18.4647 7.60536 20.625 11.4467 20.625Z"
                fill="#34A853"
              />
              <path
                d="M5.86006 12.9036C5.65272 12.3047 5.53273 11.663 5.53273 11C5.53273 10.3369 5.65272 9.69524 5.84915 9.09636L5.84366 8.96881L2.774 6.63257L2.67357 6.67938C2.00792 7.98412 1.62598 9.44929 1.62598 11C1.62598 12.5507 2.00792 14.0158 2.67357 15.3205L5.86006 12.9036Z"
                fill="#FBBC05"
              />
              <path
                d="M11.4467 5.09664C13.2909 5.09664 14.5349 5.87733 15.2443 6.52974L18.0161 3.8775C16.3138 2.32681 14.0985 1.375 11.4467 1.375C7.60539 1.375 4.28792 3.53526 2.67285 6.6794L5.84844 9.09638C6.64514 6.77569 8.84949 5.09664 11.4467 5.09664Z"
                fill="#EB4335"
              />
            </svg>
            <button onClick={handleLoginProvider}> Sign In with Google </button>{" "}
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center gap-x-2 border border-bgray-300 dark:border-darkblack-400 rounded-lg px-6 py-4 text-base text-bgray-900 dark:text-white font-medium"
          >
            <svg
              className="fill-bgray-900 dark:fill-white"
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.8744 7.50391C19.7653 7.56519 17.1672 8.85841 17.1672 11.7258C17.2897 14.9959 20.4459 16.1427 20.5 16.1427C20.4459 16.2039 20.0235 17.7049 18.7724 19.2783C17.7795 20.6336 16.6775 22 15.004 22C13.4121 22 12.8407 21.0967 11.004 21.0967C9.03147 21.0967 8.47335 22 6.96314 22C5.28967 22 4.10599 20.5603 3.05896 19.2178C1.69871 17.4606 0.54254 14.703 0.501723 12.0553C0.474217 10.6522 0.774128 9.27304 1.53544 8.10158C2.60998 6.46614 4.52835 5.35595 6.6233 5.31935C8.22845 5.2708 9.65703 6.30777 10.6366 6.30777C11.5754 6.30777 13.3305 5.31935 15.3163 5.31935C16.1735 5.32014 18.4592 5.55173 19.8744 7.50391ZM10.5009 5.03921C10.2151 3.75792 11.004 2.47663 11.7387 1.65931C12.6774 0.670887 14.1601 0 15.4388 0C15.5204 1.28129 15.0031 2.53791 14.0785 3.45312C13.2489 4.44154 11.8203 5.18565 10.5009 5.03921Z" />
            </svg>
            <span> Sign In with Apple </span>
          </a>
        </div>
        <div className="relative mt-6 mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-darkblack-400"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-darkblack-500 px-2 text-base text-bgray-600">
              Or continue with
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="Nhập Email..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative mb-6">
                      <Input
                        className="text-bgray-800 focus-visible:ring-0  focus-visible:ring-offset-0 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                        placeholder="Nhập mật khẩu..."
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        aria-label="none"
                        className="absolute top-4 right-4 bottom-4"
                        type="button"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 12a5 5 0 019.9-1"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between mb-7">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
                  name="remember"
                  id="remember"
                />
                <label
                  htmlFor="remember"
                  className="text-bgray-900 dark:text-white text-base font-semibold"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="action"
              className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
            >
              Đăng nhập
            </Button>
          </form>
        </Form>

        <p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign Up
          </Link>
        </p>
        <nav className="flex items-center justify-center flex-wrap gap-x-11 pt-24">
          <Link href="#" className="text-sm text-bgray-700 dark:text-white">
            Terms & Condition
          </Link>
          <Link href="#" className="text-sm text-bgray-700 dark:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-bgray-700 dark:text-white">
            Help
          </Link>
          <Link href="#" className="text-sm text-bgray-700 dark:text-white">
            English
          </Link>
        </nav>
        <p className="text-bgray-600 dark:text-white text-center text-sm mt-6">
          @ 2023 Bankco. All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default LeftSide;

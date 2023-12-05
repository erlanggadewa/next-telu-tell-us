"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {HTMLAttributes, useState} from "react";
import Loading from "@/components/ui/loading";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        const result: any = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (result.error) setError(result.error)
        else location.href = '/'
        setIsLoading(false)
    };

    return (
        <Form {...form}>
            {error && (
                <p className="text-red-700">{error}</p>
            )}
            <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field, formState}) => (
                        <FormItem>
                            <FormLabel>Username SSO</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            {formState.errors.email &&
                                <FormMessage>{formState?.errors.email.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field, formState}) => (
                        <FormItem>
                            <FormLabel>Kata Sandi</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            {formState.errors.password &&
                                <FormMessage>{formState?.errors.password.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <Button full capitalize type="submit" variant="red" style={{marginTop: "30px"}}>
                    {!isLoading ? 'Masuk' :
                        <>
                            <div className="animate-spin mr-2">
                                <div
                                    className="h-full w-full rounded-[50%] border-4 border-b-red-700 border-t-red-500"/>
                            </div>
                            Loading...
                        </>
                    }
                </Button>
                <Button type="submit" variant="link" className="text-[#3F52FF]">
                    Lupa kata sandi? Klik disini
                </Button>
            </form>
        </Form>
    );
}

"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { createCourseAction } from "../actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const createCourseFormSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export function CreateCourseForm({
    revalidatePagePath,
    className
}: {
    revalidatePagePath: string;
    className: string;
}) {
    const [isCreateTransition, startCreateTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(createCourseFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    startCreateTransition(async () => {
                        createCourseAction(data, revalidatePagePath);
                        form.reset();
                    })
                })}
                className={cn(className, "space-y-8")}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder="название..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Textarea placeholder="описание..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isCreateTransition} type="submit">Добавить</Button>
            </form>
        </FormProvider>
    );
}
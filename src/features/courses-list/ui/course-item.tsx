"use client";

import { useState } from "react";
import { CourseListElement } from "../model/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { deleteCourseAction } from "../actions";

type Props = {
    course: CourseListElement;
    revalidatePagePath: string;
};

export function CourseItem({ course, revalidatePagePath }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCourseAction(course.id, revalidatePagePath);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button disabled={isDeleting} onClick={handleDelete}>
                    {isDeleting ? "Удаляем..." : "Удалить"}
                </Button>
            </CardFooter>
        </Card>
    );
}

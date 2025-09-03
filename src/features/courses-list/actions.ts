"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "./courses.repository";
import { CourseListElement, CreateCourseListElementCommand } from "./model/types";


export const createCourseAction = async (
    command: CreateCourseListElementCommand,
    revalidatePagePath: string,
) => {
    await coursesRepository.createCourseElement(command);
    revalidatePath(revalidatePagePath);
};


export async function deleteCourseAction(courseId: string, path: string) {
    await coursesRepository.deleteCourseElement({ id: courseId });
    revalidatePath(path);
};


export async function getCoursesListAction(): Promise<CourseListElement[]> {
    return coursesRepository.getCoursesList();
}
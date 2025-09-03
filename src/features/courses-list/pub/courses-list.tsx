import { CourseItem } from "../ui/course-item";
import { getCoursesListAction } from "../actions";

type Props = {
    revalidatePagePath: string;
};

export async function CoursesList({ revalidatePagePath }: Props) {
    const coursesList = await getCoursesListAction(); // ✅ сервер получает данные

    if (coursesList.length === 0) {
        return <div>Курсы пока не добавлены</div>;
    }

    return (
        <div className="flex flex-col gap-3">
            {coursesList.map((course) => (
                <CourseItem
                    key={course.id}
                    course={course}
                    revalidatePagePath={revalidatePagePath}
                />
            ))}
        </div>
    );
}
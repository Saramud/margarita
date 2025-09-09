import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { deleteCourseAction } from "../actions";
import { CourseItem } from "./course-item";

// мокнем deleteCourseAction
jest.mock("../actions", () => ({
    deleteCourseAction: jest.fn(),
}));

describe("CourseItem", () => {
    const course = {
        id: "1",
        name: "React Basics",
        description: "Learn the basics of React",
    };
    const revalidatePagePath = "/courses";

    it("рендерит курс", () => {
        render(<CourseItem course={course} revalidatePagePath={revalidatePagePath} />);

        expect(screen.getByText("React Basics")).toBeInTheDocument();
        expect(screen.getByText("Learn the basics of React")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Удалить" })).toBeInTheDocument();
    });

    it("вызывает deleteCourseAction при клике", async () => {
        const user = userEvent.setup();
        render(<CourseItem course={course} revalidatePagePath={revalidatePagePath} />);

        const button = screen.getByRole("button", { name: "Удалить" });
        await user.click(button);

        expect(deleteCourseAction).toHaveBeenCalledWith(course.id, revalidatePagePath);
    });

    it("меняет состояние кнопки во время удаления", async () => {
        // эмулируем долгий промис
        (deleteCourseAction as jest.Mock).mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 50))
        );

        const user = userEvent.setup();
        render(<CourseItem course={course} revalidatePagePath={revalidatePagePath} />);

        const button = screen.getByRole("button", { name: "Удалить" });
        await user.click(button);

        // кнопка должна стать disabled и поменять текст
        expect(button).toBeDisabled();
        expect(screen.getByText("Удаляем...")).toBeInTheDocument();
    });
});

import { test, expect } from "@playwright/test";

test.describe("Kanban Board - Move Task", () => {
  test('should allow the user to move a task from "To Do" to "In Progress"', async ({
    page,
  }) => {
    await page.goto("/");

    // Assume there's a task already in the "To Do" column
    const taskSelector = ".todo-column .task-item:first-child";

    // Drag the task to the "In Progress" column
    const taskName = await page.textContent(`${taskSelector} .task-name`);
    await page.dragAndDrop(taskSelector, ".inprogress-column");

    // Verify that the task is now in the "In Progress" column
    const movedTaskName = await page.textContent(
      ".inprogress-column .task-item:last-child .task-name"
    );
    expect(movedTaskName).toBe(taskName);
  });
});

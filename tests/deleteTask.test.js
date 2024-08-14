import { test, expect } from "@playwright/test";

test.describe("Kanban Board - Delete Task", () => {
  test("should allow the user to delete a task", async ({ page }) => {
    await page.goto("/");

    // Assume there's a task in the "To Do" column
    const taskSelector = ".todo-column .task-item:first-child";
    const taskName = await page.textContent(`${taskSelector} .task-name`);

    // Click on the "Delete" button
    await page.click(`${taskSelector} text=Delete`);

    // Confirm the deletion in the modal
    await page.click("text=Confirm");

    // Verify that the task is removed from the board
    const tasksAfterDeletion = await page.$$eval(
      ".todo-column .task-item .task-name",
      (tasks) => tasks.map((task) => task.textContent)
    );
    expect(tasksAfterDeletion).not.toContain(taskName);
  });
});

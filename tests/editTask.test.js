const { test, expect } = require("@playwright/test");
const { login } = require("./utils/auth");

test("Edit task", async ({ page }) => {
  await login(page, "jager123@gmail.com", "test123");

  await page.goto("http://localhost:3000/v1");
  await page.click('button:has-text("New Task")');
  await page.fill('input[name="Task Name"]', "Updated Task Title");
  await page.click('button:has-text("Create")');

  const updatedTask = await page.textContent(".task-list");
  expect(updatedTask).toContain("Updated Task Title");
});

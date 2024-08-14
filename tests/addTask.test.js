// tests/addTask.test.js
const { test, expect } = require('@playwright/test');
const { login } = require('./utils/auth');

test('Add new task', async ({ page }) => {
  // Login before performing actions
  await login(page, 'testuser@example.com', 'password123');

  // Navigate to the task management page
  await page.goto('http://localhost:3000/v1');

  // Perform test actions for adding a new task
  await page.click('button:has-text("New Task")');
  await page.fill('input[name="taskTitle"]', 'New Task');
  await page.fill('textarea[name="taskDescription"]', 'Task description');
  await page.click('button:has-text("Save Task")');

  // Verify the task is added
  const taskList = await page.textContent('.task-list');
  expect(taskList).toContain('New Task');
});

const login = async (page, email, password) => {
  await page.goto("http://localhost:3000/v1/login"); // Adjust the URL if needed
  await page.fill('input[name="jager123@gmail.com"]', email); // Fill email input
  await page.fill('input[name="test123"]', password); // Fill password input
  await page.click('button[type="submit"]'); // Click the submit button
  await page.waitForNavigation(); // Wait for navigation after login
};

module.exports = { login };

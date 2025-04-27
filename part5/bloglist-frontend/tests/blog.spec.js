import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173')
})

test.describe('Blog app', () => {
  test('Login form is visible', async ({ page }) => {
    const form = page.getByTestId('login-form')
    const usernameInput = page.getByTestId('loginUsername')
    const passwordInput = page.getByTestId('loginPassword')
    const loginButton = page.getByTestId('loginButton')
    await expect(form).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
})
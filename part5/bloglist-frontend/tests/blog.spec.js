import { test, expect } from '@playwright/test'
import { spawn } from 'child_process'

let frontendProcess

test.beforeAll(() => {
  console.log('Starting frontend process...')
  frontendProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
  })
})

test.afterAll(() => {
  if (frontendProcess) {
    frontendProcess.kill()
  }
})

test.beforeEach(async ({ page, request }) => {
  await page.goto('/')
  await request.post('/api/testing/reset')
  await request.post('/api/user', {
    data: {
      username: 'admin',
      name: 'admin',
      password: 'admin'
    }
  })
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

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = page.getByTestId('loginUsername')
      const passwordInput = page.getByTestId('loginPassword')
      const loginButton = page.getByTestId('loginButton')
      const blog = page.getByTestId('blog')

      await usernameInput.fill('admin')
      await passwordInput.fill('admin')
      await loginButton.click()

      await expect(blog).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = page.getByTestId('loginUsername')
      const passwordInput = page.getByTestId('loginPassword')
      const loginButton = page.getByTestId('loginButton')
      const blog = page.getByTestId('blog')

      await usernameInput.fill('wrong')
      await passwordInput.fill('wrong')
      await loginButton.click()

      await expect(blog).not.toBeVisible()
    })

    test.describe('When logged in', () => {
      test.beforeEach(async ({ page }) => {
        const usernameInput = page.getByTestId('loginUsername')
        const passwordInput = page.getByTestId('loginPassword')
        const loginButton = page.getByTestId('loginButton')

        await usernameInput.fill('admin')
        await passwordInput.fill('admin')
        await loginButton.click()

        const blog = page.getByTestId('blog')
        await expect(blog).toBeVisible()
      })

      test('A blog can be created', async ({ page }) => {
        const formNewPost = page.getByTestId('formNewPost')
        const inputTitle = formNewPost.getByTestId('inputTitle')
        const inputAuthor = formNewPost.getByTestId('inputAuthor')
        const inputUrl = formNewPost.getByTestId('inputUrl')
        const btnCreate = formNewPost.getByTestId('btnCreate')
        const btnToggleShow = page.getByTestId('btnToggleShow')

        await btnToggleShow.click()

        await expect(formNewPost).toBeVisible()
        await expect(inputTitle).toBeVisible()
        await expect(inputAuthor).toBeVisible()
        await expect(inputUrl).toBeVisible()
        await expect(btnCreate).toBeVisible()

        await inputTitle.fill('Test title')
        await inputAuthor.fill('Test author')
        await inputUrl.fill('http://test.com')
        await btnCreate.click()

        const newTitle = page.getByTestId('postTitle').getByText('Test title')
        const newAuthor = page.getByTestId('postAuthor').getByText('Test author')

        await expect(newTitle).toBeVisible()
        await expect(newAuthor).toBeVisible()
      })
    })
  })
})
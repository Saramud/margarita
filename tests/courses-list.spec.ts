import { test, expect } from '@playwright/test';

test('create delete course list', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Название' }).click();
    await page.getByRole('textbox', { name: 'Название' }).fill('Test course');
    await page.getByRole('textbox', { name: 'Название' }).click();
    await page.getByRole('textbox', { name: 'Описание' }).click();
    await page.getByRole('textbox', { name: 'Описание' }).fill('Test description');
    await page.getByRole('button', { name: 'Добавить' }).click();
    await expect(page.getByText('Test courseTest descriptionУдалить')).toBeVisible();
    await page.getByRole('button', { name: 'Удалить' }).click();
    await expect(page.getByText('Test courseTest descriptionУдалить')).not.toBeVisible();
});
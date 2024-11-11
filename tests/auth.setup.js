import { test } from '@playwright/test';
import { existsSync } from 'fs';

const creditUserFile = './credituser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './newuser.json';
const paymentUserFile = './paymentuser.json';
const profileUserFile = './profileuser.json';

test('setup authentication', async () => {
  if (!existsSync(creditUserFile) || !existsSync(nonCreditUserFile) || !existsSync(newUserFile) || !existsSync(paymentUserFile) || !existsSync(profileUserFile)) {
    throw new Error('Authentication state files are missing. Run the global setup first.');
  }
});

// src/app.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from './app';

test('GET /dummy responds successfully', async () => {
  const response = await request(app).get('/dummy');
  assert.equal(response.status, 200);
});
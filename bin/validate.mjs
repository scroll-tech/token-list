#!/usr/bin/env node

import { validate } from '../src/validate.mjs'

const changedTokens = process.argv[2].split(',')

;(async () => validate(changedTokens))()

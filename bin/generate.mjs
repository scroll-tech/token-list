#!/usr/bin/env node

import fs from 'fs'
import { generate } from '../src/generate.mjs'

fs.writeFileSync('scroll.tokenlist.json', JSON.stringify(generate(), null, 2))

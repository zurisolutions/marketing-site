#!/usr/bin/env node
/*
  Loads each public page in an FR-selected jsdom environment, runs the real
  zuri-i18n.js translation logic against it, then scans the rendered text
  for leftover English. Fails (non-zero exit) if any is found.
*/
'use strict';

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const I18N_SCRIPT = fs.readFileSync(path.join(PUBLIC_DIR, 'js', 'zuri-i18n.js'), 'utf8');

const PAGES = ['index.html', 'how-we-work.html', 'use-cases.html'];

// Whole-word markers that show up in English sentences but essentially never
// in this site's French copy. Deliberately excludes brand names, EN/FR toggle
// labels, and other strings the audit confirmed should stay in English.
const ENGLISH_MARKERS = /\b(the|and|with|your|you're|you|our|not|from|will|was|were|has|have|been|they|their|does|did|this|that|these|those|for|but|reserved|rights|repetitive|business|workflow|automation|dashboard|report|human|instead|answered|flagged|sending|automatic|control)\b/i;

const ALLOWLIST = new Set([
  'Zuri Solutions',
  'LinkedIn',
  'Chrome',
  'EN',
  'FR',
  'contact@zurisolutions.dev'
]);

function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '');
}

function collapse(text) {
  return text.trim().replace(/\s+/g, ' ');
}

function checkPage(fileName) {
  const filePath = path.join(PUBLIC_DIR, fileName);
  const html = stripScripts(fs.readFileSync(filePath, 'utf8'));
  const url = 'https://www.zurisolutions.dev/' + (fileName === 'index.html' ? '' : fileName);

  const dom = new JSDOM(html, { url, runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;

  window.localStorage.setItem('zuri-language', 'fr');
  window.eval(I18N_SCRIPT);
  window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true, cancelable: true }));

  const walker = window.document.createTreeWalker(window.document.body, window.NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      return node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName) && node.nodeValue.trim()
        ? window.NodeFilter.FILTER_ACCEPT
        : window.NodeFilter.FILTER_REJECT;
    }
  });

  const flagged = [];
  let node;
  while ((node = walker.nextNode())) {
    const text = collapse(node.nodeValue);
    if (!text || ALLOWLIST.has(text)) continue;
    if (ENGLISH_MARKERS.test(text)) flagged.push(text);
  }

  window.close();
  return flagged;
}

let failed = false;
for (const page of PAGES) {
  const flagged = checkPage(page);
  if (flagged.length) {
    failed = true;
    console.log(`\n✗ ${page} — ${flagged.length} likely-untranslated string(s):`);
    flagged.forEach((text) => console.log('  - ' + text));
  } else {
    console.log(`✓ ${page} — no leftover English detected in FR mode`);
  }
}

if (failed) {
  console.log('\nFR localization check FAILED.');
  process.exit(1);
} else {
  console.log('\nFR localization check passed.');
}

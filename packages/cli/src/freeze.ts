import fs from 'fs-extra';
import path from 'pathe';
import crypto from 'node:crypto';
import { FreezeManifest } from './types.js';

export const LOCK_FILE_NAME = '.design-skills.lock';

/**
 * Calculates the SHA-256 hash of a file's content.
 */
export async function calculateFileHash(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, 'utf-8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Creates a lock manifest containing SHA-256 hashes of all design governance files.
 */
export async function freezeProject(targetDir: string): Promise<FreezeManifest> {
  const trackedFiles = [
    'tokens.css',
    'tokens.json',
    'DESIGN.md',
    'DESIGN-PROMPT.md',
    '.agent/rules/design-core.md',
    '.agents/rules/design-core.md',
    '.agent/skills/design-system/SKILL.md',
    '.agents/skills/design-system/SKILL.md',
    '.cursor/rules/00-design-core.mdc',
    '.cursor/rules/design-core.mdc',
    'CLAUDE.md',
    'AGENTS.md'
  ];

  const hashes: Record<string, string> = {};

  for (const relPath of trackedFiles) {
    const fullPath = path.resolve(targetDir, relPath);
    if (await fs.pathExists(fullPath)) {
      hashes[relPath] = await calculateFileHash(fullPath);
    }
  }

  const manifest: FreezeManifest = {
    version: '1.1.0',
    generatedAt: new Date().toISOString(),
    hashes
  };

  const lockPath = path.resolve(targetDir, LOCK_FILE_NAME);
  await fs.writeJSON(lockPath, manifest, { spaces: 2 });

  return manifest;
}

/**
 * Removes the lock manifest, allowing modifications.
 */
export async function unfreezeProject(targetDir: string): Promise<boolean> {
  const lockPath = path.resolve(targetDir, LOCK_FILE_NAME);
  if (await fs.pathExists(lockPath)) {
    await fs.remove(lockPath);
    return true;
  }
  return false;
}

/**
 * Verifies that locked files match their SHA-256 hash signatures.
 */
export async function verifyFreezeIntegrity(targetDir: string): Promise<{
  locked: boolean;
  valid: boolean;
  modifiedFiles: string[];
}> {
  const lockPath = path.resolve(targetDir, LOCK_FILE_NAME);
  if (!(await fs.pathExists(lockPath))) {
    return { locked: false, valid: true, modifiedFiles: [] };
  }

  const manifest = (await fs.readJSON(lockPath)) as FreezeManifest;
  const modifiedFiles: string[] = [];

  for (const [relPath, expectedHash] of Object.entries(manifest.hashes)) {
    const fullPath = path.resolve(targetDir, relPath);
    if (!(await fs.pathExists(fullPath))) {
      modifiedFiles.push(`${relPath} (deleted)`);
      continue;
    }

    const currentHash = await calculateFileHash(fullPath);
    if (currentHash !== expectedHash) {
      modifiedFiles.push(relPath);
    }
  }

  return {
    locked: true,
    valid: modifiedFiles.length === 0,
    modifiedFiles
  };
}


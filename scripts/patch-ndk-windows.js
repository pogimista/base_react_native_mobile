#!/usr/bin/env node
// Windows-only fix for a real bug in the Android NDK's own CMake toolchain
// file: android-legacy.toolchain.cmake unconditionally adds -Wl,--no-undefined
// to every native (C++) link step. On the Windows-hosted lld linker, that flag
// breaks resolution of the implicitly-linked shared C++ runtime, so every
// native module fails to link with "undefined symbol" errors for basic
// libc++ symbols (std::string, operator new, etc.) -- even in a project with
// zero third-party native code.
//
// This patches the flag to be skipped when the build host is Windows, for
// every NDK version currently installed. Safe to re-run (no-ops once patched)
// and only touches files inside the local Android SDK install, not the repo.

const fs = require('fs');
const path = require('path');

if (process.platform !== 'win32') {
  process.exit(0);
}

const OLD = 'if(NOT ANDROID_ALLOW_UNDEFINED_SYMBOLS)';
const NEW = 'if(NOT ANDROID_ALLOW_UNDEFINED_SYMBOLS AND NOT CMAKE_HOST_WIN32)';

function findSdkRoot() {
  const candidates = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk'),
  ].filter(Boolean);

  return candidates.find((p) => fs.existsSync(p));
}

function patchToolchainFile(file) {
  const contents = fs.readFileSync(file, 'utf8');

  if (contents.includes(NEW)) {
    return 'already-patched';
  }
  if (!contents.includes(OLD)) {
    return 'pattern-not-found';
  }

  fs.writeFileSync(file, contents.replace(OLD, NEW));
  return 'patched';
}

const sdkRoot = findSdkRoot();
if (!sdkRoot) {
  console.warn('[patch-ndk-windows] Could not find the Android SDK (checked ANDROID_HOME, ANDROID_SDK_ROOT, %LOCALAPPDATA%\\Android\\Sdk). Skipping.');
  process.exit(0);
}

const ndkRoot = path.join(sdkRoot, 'ndk');
if (!fs.existsSync(ndkRoot)) {
  console.warn(`[patch-ndk-windows] No NDK installed yet under ${ndkRoot}. Run the Android build once to let it download, then re-run: node scripts/patch-ndk-windows.js`);
  process.exit(0);
}

const versions = fs.readdirSync(ndkRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (versions.length === 0) {
  console.warn(`[patch-ndk-windows] No NDK versions found under ${ndkRoot}. Skipping.`);
  process.exit(0);
}

for (const version of versions) {
  const file = path.join(ndkRoot, version, 'build', 'cmake', 'android-legacy.toolchain.cmake');
  if (!fs.existsSync(file)) {
    continue;
  }

  const result = patchToolchainFile(file);
  console.log(`[patch-ndk-windows] NDK ${version}: ${result}`);
}

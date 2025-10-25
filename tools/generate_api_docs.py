#!/usr/bin/env python3
import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

REPO_ROOT = Path(os.getenv("WORKSPACE", "/workspace")).resolve()
OUTPUT_PATH = REPO_ROOT / "docs" / "API.md"

# Regex patterns for public/exported symbols across languages
JS_TS_EXPORT_RE = re.compile(r"^\s*export\s+(?:default\s+)?(function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)", re.MULTILINE)
JS_TS_EXPORT_NAMED_RE = re.compile(r"^\s*export\s*\{([^}]+)\}", re.MULTILINE)
JS_TS_FUNC_RE = re.compile(r"^\s*export\s+function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)", re.MULTILINE)
JS_TS_CLASS_RE = re.compile(r"^\s*export\s+class\s+([A-Za-z_$][\w$]*)", re.MULTILINE)

PY_DEF_RE = re.compile(r"^\s*def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\):", re.MULTILINE)
PY_CLASS_RE = re.compile(r"^\s*class\s+([A-Za-z_][A-Za-z0-9_]*)(?:\([^)]*\))?:", re.MULTILINE)

GO_EXPORT_RE = re.compile(r"^\s*(?:type\s+(?:struct|interface)\s+|func\s+)([A-Z][A-Za-z0-9_]*)", re.MULTILINE)

RUST_PUB_RE = re.compile(r"^\s*pub\s+(?:fn|struct|enum|trait)\s+([A-Za-z_][A-Za-z0-9_]*)", re.MULTILINE)

JAVA_PUBLIC_RE = re.compile(r"\bpublic\s+(?:class|interface|enum)\s+([A-Za-z_][A-Za-z0-9_]*)", re.MULTILINE)
JAVA_METHOD_RE = re.compile(r"\bpublic\s+[^\s(]+\s+([a-zA-Z_][A-Za-z0-9_]*)\s*\(([^)]*)\)")

SHELL_FUNC_RE = re.compile(r"^(?:function\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*\(\)\s*\{", re.MULTILINE)

MD_HEADER = """---
title: API Reference
description: Auto-generated documentation of public APIs, functions, and components.
---

# API Reference

This document is auto-generated. Do not edit by hand.

"""

LANG_EXTS = {
    "js": [".js", ".jsx"],
    "ts": [".ts", ".tsx"],
    "py": [".py"],
    "go": [".go"],
    "rs": [".rs"],
    "java": [".java", ".kt", ".kts", ".groovy"],
    "sh": [".sh", ".bash", ".zsh"],
}

IGNORE_DIRS = {"node_modules", ".git", ".venv", "dist", "build", "out", "target", "venv", ".idea", ".vscode"}


def is_ignored(path: Path) -> bool:
    parts = set(p for p in path.parts)
    return any(ignored in parts for ignored in IGNORE_DIRS)


def read_text_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def parse_js_ts(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    # export function and class
    for m in JS_TS_FUNC_RE.finditer(text):
        name, params = m.group(1), m.group(2).strip()
        symbols.append({"kind": "function", "name": name, "signature": f"{name}({params})", "file": str(path)})
    for m in JS_TS_CLASS_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "class", "name": name, "signature": name, "file": str(path)})
    # export const/let/var/interface/type/enum
    for m in JS_TS_EXPORT_RE.finditer(text):
        kind, name = m.group(1), m.group(2)
        if kind in {"function", "class"}:
            continue  # already captured
        symbols.append({"kind": kind, "name": name, "signature": name, "file": str(path)})
    # export { a, b as c }
    for m in JS_TS_EXPORT_NAMED_RE.finditer(text):
        names = [n.strip() for n in m.group(1).split(',') if n.strip()]
        for n in names:
            if " as " in n:
                n = n.split(" as ")[1].strip()
            symbols.append({"kind": "symbol", "name": n, "signature": n, "file": str(path)})
    return symbols


def parse_py(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    for m in PY_CLASS_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "class", "name": name, "signature": name, "file": str(path)})
    for m in PY_DEF_RE.finditer(text):
        name, params = m.group(1), m.group(2).strip()
        if name.startswith("_"):
            continue
        symbols.append({"kind": "function", "name": name, "signature": f"{name}({params})", "file": str(path)})
    return symbols


def parse_go(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    for m in GO_EXPORT_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "export", "name": name, "signature": name, "file": str(path)})
    return symbols


def parse_rust(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    for m in RUST_PUB_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "pub", "name": name, "signature": name, "file": str(path)})
    return symbols


def parse_java(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    for m in JAVA_PUBLIC_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "type", "name": name, "signature": name, "file": str(path)})
    # Methods
    for m in JAVA_METHOD_RE.finditer(text):
        name, params = m.group(1), m.group(2)
        symbols.append({"kind": "method", "name": name, "signature": f"{name}({params})", "file": str(path)})
    return symbols


def parse_shell(path: Path, text: str) -> List[Dict[str, str]]:
    symbols = []
    for m in SHELL_FUNC_RE.finditer(text):
        name = m.group(1)
        symbols.append({"kind": "function", "name": name, "signature": f"{name}()", "file": str(path)})
    return symbols


PARSERS = [
    (LANG_EXTS["ts"] + LANG_EXTS["js"], parse_js_ts),
    (LANG_EXTS["py"], parse_py),
    (LANG_EXTS["go"], parse_go),
    (LANG_EXTS["rs"], parse_rust),
    (LANG_EXTS["java"], parse_java),
    (LANG_EXTS["sh"], parse_shell),
]


def scan_repository(root: Path) -> List[Dict[str, str]]:
    symbols: List[Dict[str, str]] = []
    for dirpath, dirnames, filenames in os.walk(root):
        # filter ignored dirs
        dirparts = set(Path(dirpath).parts)
        if any(ignored in dirparts for ignored in IGNORE_DIRS):
            continue
        for filename in filenames:
            path = Path(dirpath) / filename
            if is_ignored(path):
                continue
            text = read_text_safe(path)
            if not text:
                continue
            ext = path.suffix
            for exts, parser in PARSERS:
                if ext in exts:
                    try:
                        symbols.extend(parser(path, text))
                    except Exception:
                        pass
                    break
    return symbols


def group_by_file(symbols: List[Dict[str, str]]) -> Dict[str, List[Dict[str, str]]]:
    grouped: Dict[str, List[Dict[str, str]]] = {}
    for s in symbols:
        grouped.setdefault(s["file"], []).append(s)
    return grouped


def render_markdown(symbols: List[Dict[str, str]]) -> str:
    if not symbols:
        return MD_HEADER + "No public APIs were detected in this repository.\n"
    grouped = group_by_file(symbols)
    lines: List[str] = [MD_HEADER]
    for file in sorted(grouped.keys()):
        rel = str(Path(file).resolve().relative_to(REPO_ROOT))
        lines.append(f"## {rel}")
        for s in grouped[file]:
            lines.append(f"- **{s['kind']}**: `{s['signature']}`")
        lines.append("")
    # Append usage guide
    lines.append("---\n\n## Usage\n")
    lines.append("- **Regenerate**: run `python3 tools/generate_api_docs.py`.\n")
    lines.append("- **Scope**: Detects exported/public functions, classes, types across JS/TS, Python, Go, Rust, Java/Kotlin/Groovy, and shell.")
    lines.append("- **Notes**: This is a static regex-based extractor; adjust as needed for your codebase.")
    return "\n".join(lines)


def main() -> None:
    symbols = scan_repository(REPO_ROOT)
    md = render_markdown(symbols)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(md, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

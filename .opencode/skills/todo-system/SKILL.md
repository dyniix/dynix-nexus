---
name: todo-system
description: Session-scoped, auto-creating, live-updating, auto-deleting execution checklist. RAM not SSD. Only current implementation work.
---

# Todo System — Execution Checklist

## Core Rules

| Rule | Behavior |
|---|---|
| **Session-only** | Todos = current implementation steps ONLY. Nothing else. |
| **Auto-create** | Multi-step work → automatic checklist on first step |
| **Live update** | Every milestone updates the list immediately |
| **Auto-delete** | All done → list gone. No archive inside the list. |
| **Small work** | No Todos for single edits, one-liners, quick answers |

## When to Create

Do NOT create for:
- Single-file edits
- One-line fixes
- Quick answers
- Explanations
- Architecture discussions (belongs in chronicles)

DO create when:
- Multiple implementation steps exist
- Multiple files are involved
- A feature requires planning
- The work spans several replies

## When to Update

- Every meaningful milestone → update immediately
- Never ask user "what is left?" — the list always shows current state
- Strike through completed items, don't remove until all done

## When to Delete

- ALL items complete → clear entire list
- Never keep completed todos — history is in chronicles + git

## Philosophy

**Todos = RAM. Chronicles = SSD.**

- RAM: temporary, fast, only current work
- SSD: persistent, long-term, history

Todos answer only one question: "What am I working on right now?"

Nothing more. Nothing less.

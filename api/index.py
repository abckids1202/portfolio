"""Repository-root Vercel entry point for the nested Flask application."""

import sys
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[1] / "portfolio"
sys.path.insert(0, str(PROJECT_DIR))

from app import app

__all__ = ["app"]

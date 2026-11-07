#!/usr/bin/env python3
"""Synchronize website reviewer records into a marked block in the CV TeX source."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
START = '% BEGIN WEBSITE REVIEWERS'
END = '% END WEBSITE REVIEWERS'


def latex(value):
    substitutions = {'\\': r'\textbackslash{}', '&': r'\&', '%': r'\%', '#': r'\#', '_': r'\_', '$': r'\$', '{': r'\{', '}': r'\}'}
    return ''.join(substitutions.get(char, char) for char in value)


def render(data):
    groups = data['sections']['academic_service']['reviewers']
    blocks = []
    for key, title in [('Conferences', 'Conference Reviewer'), ('Journals', 'Journal Reviewer')]:
        entries = groups[key]
        if not isinstance(entries, list) or not entries:
            raise ValueError(f'{key} must contain reviewer entries')
        rows = []
        for entry in entries:
            if not isinstance(entry, list) or len(entry) != 2 or not all(isinstance(x, str) and x.strip() for x in entry):
                raise ValueError(f'Invalid {key} reviewer entry: {entry!r}')
            venue, years = entry
            if not re.fullmatch(r'\d{4}(, \d{4})*', years):
                raise ValueError(f'Invalid years for {venue}: {years}')
            rows.append(r'\daterow{' + latex(years) + '}{' + latex(venue) + '.}')
        blocks.append('\\subsection{' + title + '}\n\\begin{tabularx}{\\textwidth}{@{}L{34mm}Y@{}}\n' + '\n'.join(rows) + '\n\\end{tabularx}')
    return START + '\n' + '\n\n'.join(blocks) + '\n' + END


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cv', type=Path, required=True, help='Path to the CV repository')
    parser.add_argument('--check', action='store_true', help='Check for drift without writing')
    args = parser.parse_args()
    data = json.loads((ROOT / 'static/data/profile-sections.json').read_text(encoding='utf-8'))
    cv = args.cv / 'main.tex'
    source = cv.read_text(encoding='utf-8')
    if source.count(START) != 1 or source.count(END) != 1 or source.index(START) > source.index(END):
        raise ValueError('CV must contain exactly one correctly ordered pair of reviewer markers')
    start = source.index(START)
    end = source.index(END) + len(END)
    new = source[:start] + render(data) + source[end:]
    if args.check:
        if source != new:
            raise SystemExit('Reviewer data differs between website and CV')
        print('Reviewer records match.')
    elif source != new:
        cv.write_text(new, encoding='utf-8')
        print('Updated reviewer records in CV main.tex; rebuild and verify the CV.')
    else:
        print('Reviewer records already match.')

if __name__ == '__main__':
    main()

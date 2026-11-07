#!/usr/bin/env python3
"""Synchronize website reviewer records into a marked block in the CV TeX source."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVICE_START = '% BEGIN WEBSITE SERVICE'
SERVICE_END = '% END WEBSITE SERVICE'
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
        blocks.append('\\subsection{' + title + '}\n\\begin{tabularx}{\\textwidth}{@{}L{50mm}Y@{}}\n' + '\n'.join(rows) + '\n\\end{tabularx}')
    return START + '\n' + '\n\n'.join(blocks) + '\n' + END


def render_service(data):
    entries = data['sections']['academic_service']['rows']
    if not isinstance(entries, list) or not entries:
        raise ValueError('Academic service must contain entries')
    groups = {'International': [], 'Domestic': []}
    for item in sorted(entries, key=lambda x: not str(x.get('Date', '')).endswith('present')):
        date, role, venue, title = (item.get(k, '').strip() for k in ('Date', 'Role', 'Venue', 'Title'))
        if not all((date, role, venue, title)):
            raise ValueError('Each academic service entry requires Date, Role, Venue and Title')
        year = re.match(r'^(\d{4})(?:\.\d{2})?(?:[–-]present)?$', date)
        if not year:
            raise ValueError(f'Unsupported service date: {date}')
        date_text = year[1] + ('--present' if date.endswith('present') else '')
        role = latex(role)
        text = latex(title)
        link = item.get('Tutorial Site') or item.get('Website') or item.get('Explorer') or ''
        if link:
            if not re.match(r'^https?://[^\s{}\\]+$', link):
                raise ValueError(f'Invalid service link: {link}')
            text = r'\href{' + latex(link) + '}{' + text + '}'
        event = item.get('Event', '').strip()
        event_text = (', ' + latex(event)) if event else ''
        detail = r'\textbf{' + role + '}, ' + text + event_text + ' (' + latex(venue) + ').'
        category = item.get('Category', '').strip()
        scope = category.split(' ', 1)[0]
        if scope not in groups:
            raise ValueError(f'Unsupported academic service category: {category}')
        groups[scope].append(r'\daterow{' + date_text + '}{' + detail + '}')
    blocks = []
    for scope, rows in groups.items():
        if rows:
            blocks.append(r'\subsection{' + scope + '}' + '\n' + r'\begin{tabularx}{\textwidth}{@{}L{34mm}Y@{}}' + '\n' + '\n'.join(rows) + '\n' + r'\end{tabularx}')
    return SERVICE_START + '\n' + '\n\n'.join(blocks) + '\n' + SERVICE_END


def replace_block(source, start_marker, end_marker, content):
    if source.count(start_marker) != 1 or source.count(end_marker) != 1 or source.index(start_marker) > source.index(end_marker):
        raise ValueError(f'CV must contain exactly one correctly ordered pair of markers: {start_marker}')
    start = source.index(start_marker)
    end = source.index(end_marker) + len(end_marker)
    return source[:start] + content + source[end:]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cv', type=Path, required=True, help='Path to the CV repository')
    parser.add_argument('--check', action='store_true', help='Check for drift without writing')
    args = parser.parse_args()
    data = json.loads((ROOT / 'static/data/profile-sections.json').read_text(encoding='utf-8'))
    cv = args.cv / 'main.tex'
    source = cv.read_text(encoding='utf-8')
    new = replace_block(source, SERVICE_START, SERVICE_END, render_service(data))
    new = replace_block(new, START, END, render(data))
    if args.check:
        if source != new:
            raise SystemExit('Academic service differs between website and CV')
        print('Academic service records match.')
    elif source != new:
        cv.write_text(new, encoding='utf-8')
        print('Updated academic service in CV main.tex; rebuild and verify the CV.')
    else:
        print('Academic service records already match.')

if __name__ == '__main__':
    main()

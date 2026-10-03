"""Audit the saved batch against a build artifact or its live canonical URLs."""
import argparse
import concurrent.futures
import html
import json
from pathlib import Path
import re
import urllib.request
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser()
parser.add_argument('--artifact', default='artifacts/release-20261002')
parser.add_argument('--live', action='store_true')
parser.add_argument('--output', required=True)
parser.add_argument('--date', default='2026-10-02')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
artifact = root / args.artifact
origin = 'https://thechoicervoicer.me'
pages = json.loads((root / f'docs/content/practice-pages-{args.date}.json').read_text())

def read(route):
    if args.live:
        request = urllib.request.Request(origin + route, headers={'User-Agent': 'TheChoicerVoicer-ReleaseQA/1.0'})
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read().decode(), dict(response.headers)
    path = artifact / route.lstrip('/')
    if route.endswith('/'): path /= 'index.html'
    return 200, path.read_text(), {}

sitemap = read('/sitemap.xml')[1]
xml = ET.fromstring(sitemap)
urls = {e.text for e in xml.findall('{*}url/{*}loc')}
robots = read('/robots.txt')[1]
homes = {False: read('/voice-work-guides/' if args.date == '2026-10-03' else '/')[1], True: read('/zh/voice-work-guides/' if args.date == '2026-10-03' else '/zh/')[1]}
results = []
links = set()
titles = set()
descriptions = set()
for page in pages:
    for chinese in (False, True):
        prefix = '/zh/' if chinese else '/'
        route = prefix + page['slug'] + '/'
        status, source, headers = read(route)
        assert status == 200, route
        title = re.search(r'<title>(.*?)</title>', source).group(1)
        description = re.search(r'<meta name="description" content="(.*?)"', source).group(1)
        assert title not in titles and description not in descriptions, route
        titles.add(title); descriptions.add(description)
        assert len(re.findall(r'<h1[ >]', source)) == 1, route
        assert f'<link rel="canonical" href="{origin}{route}"' in source, route
        assert 'index,follow' in source and 'noindex' not in headers.get('X-Robots-Tag', ''), route
        assert origin + route in urls and origin + '/sitemap.xml' in robots, route
        assert f'href="{route}"' in homes[chinese], route
        assert f'<html lang="{"zh-CN" if chinese else "en"}">' in source, route
        assert 'undefined' not in source, route
        for language, alternate in [('en', '/' + page['slug'] + '/'), ('zh-Hans', '/zh/' + page['slug'] + '/'), ('x-default', '/' + page['slug'] + '/')]:
            assert f'hreflang="{language}" href="{origin}{alternate}"' in source, route
        graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', source, re.S).group(1))['@graph']
        assert {g['@type'] for g in graph} == {'Article', 'BreadcrumbList', 'FAQPage'}, route
        assert graph[0]['mainEntityOfPage'] == origin + route, route
        assert graph[1]['itemListElement'][-1]['item'] == origin + route, route
        unescaped = html.unescape(source)
        for heading, body in page['zhdrills' if chinese else 'drills']:
            assert heading in unescaped and body in unescaped, route
        for faq in graph[2]['mainEntity']:
            assert faq['name'] in unescaped and faq['acceptedAnswer']['text'] in unescaped, route
        assert len(re.findall(r'type="checkbox"', source)) == 6, route
        for href in re.findall(r'<a[^>]*href="([^"]+)"', source):
            if href.startswith('/') and not href.startswith('//'): links.add(href.split('#')[0])
        for image in re.findall(r'<img\b[^>]*>', source): assert 'alt=' in image, route
        results.append({'url': origin + route, 'http': status, 'title': html.unescape(title), 'canonical': origin + route, 'metadata_schema_content_links': 'pass', 'locale': 'zh-Hans' if chinese else 'en', 'source_checks': 6})

def check_link(route):
    status, _, _ = read(route)
    assert status == 200, route
    return {'url': origin + route, 'http': status}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    link_results = list(executor.map(check_link, sorted(links)))

report = {'scope': 'production' if args.live else 'build artifact', 'pages': results, 'links': link_results, 'sitemap_urls': len(urls), 'privacy': 'Only public routes inspected; no user audio or input transmitted.'}
Path(args.output).parent.mkdir(parents=True, exist_ok=True)
Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(f"PASS: {len(results)} page audits, {len(link_results)} unique internal links, {len(urls)} sitemap URLs")

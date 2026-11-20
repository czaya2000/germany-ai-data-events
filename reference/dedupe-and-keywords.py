"""REFERENCE ONLY (not runnable on its own). Prototype from the 20 Nov 2026 Germany competitive check.
Port the ideas to Node (germany/pipeline/lib/filter.mjs, dedupe.mjs, city.mjs):
  * AI_RE      - keyword prefilter applied to the TITLE (and later title+description). Tune it; it errs on the side of recall.
  * norm_title - title normalisation used for fuzzy matching (strip years, #numbers, stop words, city names).
  * match()    - two events are the same if start dates differ by <= 1 day, cities are compatible, and
                 token Jaccard >= 0.6, OR (overlap >= 0.8 of the smaller title and >= 2 shared tokens),
                 OR difflib SequenceMatcher ratio >= 0.85.
Estimated error of both the regex and the dedupe: about +-5% (see /workspace/germany-competitive-check.md)."""
import re, unicodedata
from difflib import SequenceMatcher

AI_RE=re.compile(r"(\bai\b|\ba\.i\.|\bki\b|\bki-|-ki\b|künstlich|artificial|machine[- ]?learning|\bml\b|\bmlops|\bllm|genai|gen-ai|generative|\bagent|\bdata|\bdaten|analytic|deep[- ]?learning|neural|robot|copilot|\bgpt|chatgpt|claude|gemini|vibe[- ]cod|prompt|\brag\b|\bnlp|computer[- ]vision|big[- ]data|databricks|snowflake|\bdbt\b|clickhouse|pydata|kaggle|\bbi\b|power ?bi|\bspark|kafka|\bpython|datenbank|database|\bmcp\b|openai|langchain|hugging|tensor|pytorch|quantum|\bnvidia|\bdl\b|intelligen|datasci|data-sci|aidaq|dataops|lakehouse|\bsql|postgres|cognitive|humanoid|automation)",re.I)

def is_ai(t): return bool(AI_RE.search(t))

CITY6 = [('berlin','Berlin'),('muenchen','Munich'),('münchen','Munich'),('munchen','Munich'),('munich','Munich'),
         ('hamburg','Hamburg'),('frankfurt','Frankfurt'),('köln','Cologne'),('koeln','Cologne'),('cologne','Cologne'),
         ('stuttgart','Stuttgart')]
def city6(c):
    c=(c or '').lower()
    for k,v in CITY6:
        if k in c: return v
    return 'Other/unknown'

STOP={'the','and','of','in','at','der','die','das','und','für','fur','mit','von','zu','im','an','a','for','to','with',
      'berlin','munich','muenchen','munchen','hamburg','frankfurt','cologne','koln','stuttgart','germany','deutschland',
      'event','events','meetup','online'}
def norm_title(t):
    t=unicodedata.normalize('NFKD',t.lower()); t=''.join(c for c in t if not unicodedata.combining(c))
    t=re.sub(r'20\d\d|#\d+|\bno\.?\s*\d+','',t); t=re.sub(r'[^a-z0-9 ]',' ',t)
    return ' '.join(w for w in t.split() if w not in STOP)

def toks(t): return set(t.split())
def match(a,b):
    """a,b: dicts with normalised title in 'nt'. Caller already checked date window and city compatibility."""
    if a['nt']==b['nt'] and a['nt']: return True
    ta,tb=toks(a['nt']),toks(b['nt'])
    if not ta or not tb: return False
    inter=len(ta&tb); j=inter/len(ta|tb)
    if j>=0.6: return True
    if min(len(ta),len(tb))>=2 and inter/min(len(ta),len(tb))>=0.8 and inter>=2: return True
    return SequenceMatcher(None,a['nt'],b['nt']).ratio()>=0.85

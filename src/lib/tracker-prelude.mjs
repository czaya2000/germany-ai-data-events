// Inline script that runs before any analytics tracker loads (only rendered
// when an analytics id is set in config/country.mjs):
//   ?notrack  stops counting this browser, ?track turns it back on
//   any email address is removed from the page address first (Buttondown adds
//   ?email_address=... to /subscribe/thanks/, and a tracker would store it)
export const TRACKER_PRELUDE = `(function () {
	try {
		var p = new URLSearchParams(location.search);
		var msg = '';
		var cleaned = false;
		Array.from(p.keys()).forEach(function (k) {
			if (/^e-?mail(_address)?$/i.test(k) || (p.get(k) || '').indexOf('@') !== -1) {
				p.delete(k);
				cleaned = true;
			}
		});
		if (p.has('notrack')) {
			localStorage.setItem('umami.disabled', '1');
			msg = 'Analytics off: this browser is no longer counted.';
		} else if (p.has('track')) {
			localStorage.removeItem('umami.disabled');
			msg = 'Analytics on: this browser is counted again.';
		}
		if (!msg && !cleaned) return;
		p.delete('notrack');
		p.delete('track');
		var q = p.toString();
		history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash);
		if (!msg) return;
		document.addEventListener('DOMContentLoaded', function () {
			var t = document.createElement('div');
			t.textContent = msg;
			t.setAttribute('role', 'status');
			t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;background:#000;color:#fff;padding:10px 16px;font:600 14px/1.4 system-ui,sans-serif;max-width:calc(100vw - 32px)';
			document.body.appendChild(t);
			setTimeout(function () { t.remove(); }, 5000);
		});
	} catch (e) {}
})();`;

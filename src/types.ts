export interface AppData {
  id: string;
  title: string;
  category: string;
  url: string;
  blogUrl?: string;
  dashboardUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  isActive: boolean;
  prompts?: string;
  createdAt: string;
  updatedAt: string;
}

export function parseUrlInput(raw: string): {
  url: string;
  blogUrl: string;
  dashboardUrl: string;
} {
  if (!raw || !raw.trim()) {
    return { url: '', blogUrl: '', dashboardUrl: '' };
  }

  const rawLines = raw.includes('\n')
    ? raw.split(/\r?\n/)
    : raw.split(',');

  let url = '';
  let blogUrl = '';
  let dashboardUrl = '';
  const unlabeled: { index: number; value: string }[] = [];

  const cleanUrl = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return '';
    return trimmed
      .replace(/^(앱\s*주소|블로그\s*주소|대시보드\s*주소|앱|블로그|대시보드|app|blog|dashboard)\s*[:=\-]\s*/i, '')
      .trim();
  };

  rawLines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (/^(앱|app)(\s*주소)?\s*[:=\-]/i.test(trimmed)) {
      url = cleanUrl(trimmed);
    } else if (/^(블로그|blog)(\s*주소)?\s*[:=\-]/i.test(trimmed)) {
      blogUrl = cleanUrl(trimmed);
    } else if (/^(대시보드|dashboard)(\s*주소)?\s*[:=\-]/i.test(trimmed)) {
      dashboardUrl = cleanUrl(trimmed);
    } else {
      unlabeled.push({ index: idx, value: cleanUrl(trimmed) });
    }
  });

  if (!url && !blogUrl && !dashboardUrl && rawLines.length >= 3 && rawLines.some(l => !l.trim())) {
    url = cleanUrl(rawLines[0] || '');
    blogUrl = cleanUrl(rawLines[1] || '');
    dashboardUrl = cleanUrl(rawLines[2] || '');
  } else {
    for (const item of unlabeled) {
      if (!url) url = item.value;
      else if (!blogUrl) blogUrl = item.value;
      else if (!dashboardUrl) dashboardUrl = item.value;
    }
  }

  return { url, blogUrl, dashboardUrl };
}

export function formatUrlInput(app: Partial<AppData>): string {
  const parsedFromUrl =
    app.url && (app.url.includes('\n') || app.url.includes(','))
      ? parseUrlInput(app.url)
      : { url: app.url || '', blogUrl: '', dashboardUrl: '' };

  const u = parsedFromUrl.url;
  const b = app.blogUrl ?? parsedFromUrl.blogUrl;
  const d = app.dashboardUrl ?? parsedFromUrl.dashboardUrl;

  if (d) {
    return [u, b || '', d].join('\n');
  }
  if (b) {
    return [u, b].join('\n');
  }
  return u;
}

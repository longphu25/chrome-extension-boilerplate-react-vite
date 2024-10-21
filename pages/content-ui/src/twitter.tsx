import { createRoot } from 'react-dom/client';
import { isInterstitial, proxify } from './utils';
import type { ActionGetResponse } from './types/Action.type';
import Box from './ui/Box';

const noop = () => {};

export function setupTwitterObserver() {
  console.log('Twitter observer setup');
  const twitterReactRoot = document.getElementById('react-root')!;

  const observer = new MutationObserver(mutations => {
    // it's fast to iterate like this
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];

      for (let j = 0; j < mutation.addedNodes.length; j++) {
        const node = mutation.addedNodes[j];
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        handleNewNode(node as Element).catch(noop);
      }
    }
  });

  observer.observe(twitterReactRoot, { childList: true, subtree: true });
}

async function handleNewNode(node: Element) {
  const element = node as Element;
  // first quick filtration
  if (!element || element.localName !== 'div') {
    return;
  }

  let anchor;

  const linkPreview = findLinkPreview(element);

  let container = findContainerInTweet(linkPreview?.card ?? element, Boolean(linkPreview));

  if (linkPreview) {
    anchor = linkPreview.anchor;
    container && container.remove();
    container = linkPreview.card.parentElement as HTMLElement;
  } else {
    if (container) {
      return;
    }
    const link = findLastLinkInText(element);
    if (link) {
      anchor = link.anchor;
      container = getContainerForLink(link.tweetText);
    }
  }

  if (!anchor || !container) return;

  const shortenedUrl = anchor.href;
  const actionUrl = await resolveTwitterShortenedUrl(shortenedUrl);
  const interstitialData = isInterstitial(actionUrl);

  let actionApiUrl: string | null;

  if (interstitialData.isInterstitial) {
    actionApiUrl = interstitialData.decodedActionUrl;
  } else {
    return;
  }

  const proxyUrl = proxify(actionApiUrl);
  const response = await fetch(proxyUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch action ${proxyUrl}, action url: ${actionApiUrl}`);
  }

  const data = (await response.json()) as ActionGetResponse;

  const { container: actionContainer, reactRoot } = createAction({
    originalUrl: actionUrl,
    data: data,
  });

  addStyles(container).replaceChildren(actionContainer);

  new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      for (const removedNode of Array.from(mutation.removedNodes)) {
        if (removedNode === actionContainer || !document.body.contains(actionContainer)) {
          reactRoot.unmount();
          observer.disconnect();
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
}

function createAction({ originalUrl, data }: { originalUrl: URL; data: ActionGetResponse }) {
  const container = document.createElement('div');
  container.className = 'pin-box-action-root-container';

  const actionRoot = createRoot(container);

  actionRoot.render(
    <div
      role="button"
      tabIndex={0}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
      }}>
      <Box data={data} />
    </div>,
  );

  return { container, reactRoot: actionRoot };
}

function findLinkPreview(element: Element) {
  const card = findElementByTestId(element, 'card.wrapper');
  if (!card) {
    return null;
  }

  const anchor = card.children[0]?.children[0] as HTMLAnchorElement;

  return anchor ? { anchor, card } : null;
}

function findElementByTestId(element: Element, testId: string) {
  if (element.attributes.getNamedItem('data-testid')?.value === testId) {
    return element;
  }
  return element.querySelector(`[data-testid="${testId}"]`);
}

function findContainerInTweet(element: Element, searchUp?: boolean) {
  const message = searchUp
    ? (element.closest(`[data-testid="tweet"]`) ?? element.closest(`[data-testid="messageEntry"]`))
    : (findElementByTestId(element, 'tweet') ?? findElementByTestId(element, 'messageEntry'));

  if (message) {
    return message.querySelector('.pin-box-wrapper') as HTMLElement;
  }
  return null;
}

function findLastLinkInText(element: Element) {
  const tweetText = findElementByTestId(element, 'tweetText');
  if (!tweetText) {
    return null;
  }

  const links = tweetText.getElementsByTagName('a');
  if (links.length > 0) {
    const anchor = links[links.length - 1] as HTMLAnchorElement;
    return { anchor, tweetText };
  }
  return null;
}

function getContainerForLink(tweetText: Element) {
  const root = document.createElement('div');
  root.className = 'pin-box-wrapper';
  const dm = tweetText.closest(`[data-testid="messageEntry"]`);
  if (dm) {
    root.classList.add('pin-box-dm');
    tweetText.parentElement?.parentElement?.prepend(root);
  } else {
    tweetText.parentElement?.append(root);
  }
  return root;
}

async function resolveTwitterShortenedUrl(shortenedUrl: string): Promise<URL> {
  const res = await fetch(shortenedUrl);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const actionUrl = doc.querySelector('title')?.textContent;
  return new URL(actionUrl!);
}

function addStyles(element: HTMLElement) {
  if (element && element.classList.contains('pin-box-wrapper')) {
    element.style.marginTop = '12px';
    if (element.classList.contains('pin-box-dm')) {
      element.style.marginBottom = '8px';
      element.style.width = '100%';
      element.style.minWidth = '350px';
    }
  }
  return element;
}
